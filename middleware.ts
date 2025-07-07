import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Enhanced Security configuration for Next.js 15.3.5+
const SECURITY_CONFIG = {
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
    // Enhanced rate limiting per endpoint
    strictEndpoints: {
      '/api/trading': 20, // Trading endpoints get stricter limits
      '/api/auth': 10, // Auth endpoints get very strict limits
      '/api/portfolio': 50, // Portfolio can be more permissive
    },
  },
  csrf: {
    enabled: process.env.NODE_ENV === 'production',
    tokenHeader: 'x-csrf-token',
  },
  headers: {
    csp: process.env.ENABLE_CSP !== 'false', // Default to enabled
    hsts: process.env.ENABLE_HSTS !== 'false', // Default to enabled
    frameOptions: process.env.ENABLE_X_FRAME_OPTIONS !== 'false', // Default to enabled
  },
  // New security features for 2024/2025
  security: {
    enforceHttps: process.env.NODE_ENV === 'production',
    originValidation: true,
    suspiciousActivityDetection: true,
  },
};

// In-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number; violations: number }>();
const suspiciousIpStore = new Map<
  string,
  { violations: number; lastViolation: number; blocked: boolean }
>();

// Enhanced security headers for 2024/2025 security standards
const securityHeaders = {
  // Core security headers
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '0', // Disable as modern browsers handle this better
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',

  // New 2024 security headers
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Origin-Agent-Cluster': '?1',

  // Cache control for sensitive data
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  Pragma: 'no-cache',
  Expires: '0',
};

if (SECURITY_CONFIG.headers.frameOptions) {
  securityHeaders['X-Frame-Options'] = 'DENY';
}

if (SECURITY_CONFIG.headers.hsts) {
  securityHeaders['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
}

if (SECURITY_CONFIG.headers.csp) {
  // Enhanced CSP policy for trading platform security
  securityHeaders['Content-Security-Policy'] = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.alpaca.markets wss://stream.data.alpaca.markets https://paper-api.alpaca.markets wss://stream.data.sandbox.alpaca.markets",
    "media-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
    'block-all-mixed-content',
  ].join('; ');
}

// Enhanced rate limiting with suspicious activity detection
function checkRateLimit(ip: string, pathname: string): { allowed: boolean; reason?: string } {
  const now = Date.now();

  // Check if IP is blocked for suspicious activity
  const suspicious = suspiciousIpStore.get(ip);
  if (suspicious?.blocked && now - suspicious.lastViolation < 3600000) {
    // 1 hour block
    return { allowed: false, reason: 'IP_BLOCKED_SUSPICIOUS_ACTIVITY' };
  }

  // Get endpoint-specific rate limit
  const endpointLimit =
    Object.entries(SECURITY_CONFIG.rateLimit.strictEndpoints).find(([endpoint]) =>
      pathname.startsWith(endpoint)
    )?.[1] || SECURITY_CONFIG.rateLimit.maxRequests;

  const key = `rate_limit:${ip}:${pathname.split('/').slice(0, 3).join('/')}`;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + SECURITY_CONFIG.rateLimit.windowMs,
      violations: 0,
    });
    return { allowed: true };
  }

  if (current.count >= endpointLimit) {
    // Track rate limit violations
    current.violations++;

    // Escalate to suspicious activity if too many violations
    if (current.violations > 3) {
      const suspiciousData = suspiciousIpStore.get(ip) || {
        violations: 0,
        lastViolation: 0,
        blocked: false,
      };
      suspiciousData.violations++;
      suspiciousData.lastViolation = now;

      // Block IP after 5 violations across different endpoints
      if (suspiciousData.violations >= 5) {
        suspiciousData.blocked = true;
      }

      suspiciousIpStore.set(ip, suspiciousData);
    }

    return { allowed: false, reason: 'RATE_LIMIT_EXCEEDED' };
  }

  current.count++;
  return { allowed: true };
}

// Origin validation for enhanced security
function validateOrigin(request: NextRequest): boolean {
  if (!SECURITY_CONFIG.security.originValidation) return true;

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  // Allow same-origin requests
  if (!origin) return true; // Browser requests without origin (direct navigation)

  const allowedOrigins = [
    `https://${host}`,
    `http://${host}`, // For development
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter(Boolean);

  return allowedOrigins.includes(origin);
}

// Enhanced security logging
function logSecurityEvent(type: string, ip: string, details: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type,
    ip,
    details,
    userAgent: details.userAgent || 'unknown',
  };

  // In production, send to your logging service
  if (process.env.NODE_ENV === 'production') {
    console.log('[SECURITY]', JSON.stringify(logEntry));
  } else {
    console.warn('[SECURITY]', logEntry);
  }
}

// Protected routes configuration
const protectedRoutes = [
  '/dashboard',
  '/trading',
  '/portfolio',
  '/settings',
  '/api/trading',
  '/api/portfolio',
  '/api/user',
];

const publicRoutes = ['/', '/login', '/register', '/api/auth', '/api/health', '/api/public'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';

  // Enhanced HTTPS enforcement for production
  if (
    SECURITY_CONFIG.security.enforceHttps &&
    request.headers.get('x-forwarded-proto') !== 'https' &&
    process.env.NODE_ENV === 'production'
  ) {
    return NextResponse.redirect(`https://${request.headers.get('host')}${pathname}`, 301);
  }

  // Origin validation for sensitive operations
  if (!validateOrigin(request)) {
    logSecurityEvent('INVALID_ORIGIN', ip, {
      origin: request.headers.get('origin'),
      host: request.headers.get('host'),
      pathname,
      userAgent,
    });
    return new NextResponse('Invalid Origin', { status: 403 });
  }

  // Enhanced rate limiting with endpoint-specific limits
  const rateLimitCheck = checkRateLimit(ip, pathname);
  if (!rateLimitCheck.allowed) {
    logSecurityEvent('RATE_LIMIT_VIOLATION', ip, {
      reason: rateLimitCheck.reason,
      pathname,
      userAgent,
    });

    const status = rateLimitCheck.reason === 'IP_BLOCKED_SUSPICIOUS_ACTIVITY' ? 403 : 429;
    const message =
      rateLimitCheck.reason === 'IP_BLOCKED_SUSPICIOUS_ACTIVITY'
        ? 'Access Denied - Suspicious Activity Detected'
        : 'Too Many Requests';

    return new NextResponse(message, {
      status,
      headers: {
        'Retry-After': Math.ceil(SECURITY_CONFIG.rateLimit.windowMs / 1000).toString(),
      },
    });
  }

  // Skip authentication for public routes and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    publicRoutes.some(route => pathname.startsWith(route))
  ) {
    const response = NextResponse.next();

    // Apply security headers to all responses
    Object.entries(securityHeaders).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  }

  // Check authentication for protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      console.warn(`Unauthorized access attempt to ${pathname} from IP: ${ip}`);

      if (pathname.startsWith('/api/')) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Additional security checks for sensitive API routes
    if (pathname.startsWith('/api/trading') || pathname.startsWith('/api/portfolio')) {
      // Verify user has trading permissions
      if (!token.tradingEnabled) {
        console.warn(`Trading access denied for user ${token.sub} from IP: ${ip}`);
        return new NextResponse('Trading Access Denied', { status: 403 });
      }

      // Check for suspicious activity patterns
      if (await detectSuspiciousActivity(token.sub as string, ip)) {
        console.error(`Suspicious activity detected for user ${token.sub} from IP: ${ip}`);
        return new NextResponse('Account Security Check Required', { status: 423 });
      }
    }
  }

  // Apply maintenance mode if enabled
  if (process.env.MAINTENANCE_MODE === 'true' && !pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  const response = NextResponse.next();

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add request ID for tracking
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-ID', requestId);

  return response;
}

// Suspicious activity detection (implement based on your requirements)
async function detectSuspiciousActivity(userId: string, ip: string): Promise<boolean> {
  // Implement your suspicious activity detection logic here
  // Examples:
  // - Multiple rapid API calls
  // - Unusual trading patterns
  // - Access from new geographic locations
  // - Failed authentication attempts

  return false; // Placeholder
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
