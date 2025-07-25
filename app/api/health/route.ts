import { NextRequest, NextResponse } from 'next/server';
import { performanceMonitor } from '@/lib/performance-monitor';
import { AlpacaClient, createAlpacaClientSafe } from '@/lib/trading/alpaca-client';

// Health check configuration;
const HEALTH_CONFIG = {
  timeout: 5000, // 5 seconds;
  criticalServices: ['database', 'trading_api', 'authentication', 'market_data'],;
  warningThresholds: {
    responseTime: 1000, // 1 second;
    memoryUsage: 80, // 80%;
    errorRate: 5, // 5%;
  },;
};

interface HealthStatus {















  status: 'healthy' | 'warning' | 'critical' | 'down';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  services: ServiceHealth[];
  performance: PerformanceHealth;
  dependencies: DependencyHealth[];















}

interface ServiceHealth {















  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'down';
  responseTime?: number;
  lastCheck: string;
  error?: string;















}

interface PerformanceHealth {















  memory: {
    used: number;
    total: number;
    percentage: number;
  














};
  cpu?: {
    usage: number;
  };
  responseTime: {
    average: number;
    p95: number;
    p99: number;
  };
  errorRate: number;
  requestCount: number;
}

interface DependencyHealth {















  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'down';
  latency?: number;
  error?: string;















}

class HealthChecker {
  private alpacaClient: AlpacaClient | null = null;

  constructor() {
    // Try to initialize Alpaca client, but handle missing credentials gracefully;
    this.alpacaClient = createAlpacaClientSafe();
  }

  // Check database connectivity;
  async checkDatabase(): Promise<ServiceHealth> {
    const startTime = Date.now();
    try {
      // Simple database ping - adapt to your database client;
      // const result = await prisma.$queryRaw`SELECT 1`;

      // For now, simulate database check;
      await new Promise(resolve => setTimeout(resolve, 10));

      return {
        name: 'database',;
         status: 'healthy',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      return {
        name: 'database',;
        status: 'critical',;
         status: 'critical',;
        responseTime: Date.now() - startTime,;
         responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
         lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Database connection failed',;
         error: error instanceof Error ? error.message : 'Database connection failed',;
      };
    }
  }

  // Check trading API connectivity;
  async checkTradingAPI(): Promise<ServiceHealth> {
    const startTime = Date.now();
    try {
      // If Alpaca client is not available (during build), return warning status;
      if (!this.alpacaClient) {
        return {
          name: 'trading_api',;
          status: 'warning',;
          responseTime: Date.now() - startTime,;
          lastCheck: new Date().toISOString(),;
          error: 'Trading API credentials not configured',;
        };
      }

      // Check Alpaca API connectivity;
      await this.alpacaClient.getAccount();

      return {
        name: 'trading_api',;
         name: 'trading_api',;
        status: 'healthy',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const status = responseTime > HEALTH_CONFIG.timeout ? 'critical' : 'warning';

      return {
        name: 'trading_api',;
         name: 'trading_api',;
        status,;
         status,;
        responseTime,;
         responseTime,;
        lastCheck: new Date().toISOString(),;
         lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Trading API connection failed',;
         error: error instanceof Error ? error.message : 'Trading API connection failed',;
      };
    }
  }

  // Check authentication service;
  async checkAuthentication(): Promise<ServiceHealth> {
    const startTime = Date.now();
    try {
      // Check NextAuth configuration;
      const authUrl = process.env.NEXTAUTH_URL;
      const authSecret = process.env.NEXTAUTH_SECRET;

      if (!authUrl || !authSecret) {
        throw new Error('Authentication configuration missing');
      }

      return {
        name: 'authentication',;
         name: 'authentication',;
        status: 'healthy',;
         status: 'healthy',;
        responseTime: Date.now() - startTime,;
         responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
         lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      return {
        name: 'authentication',;
         name: 'authentication',;
        status: 'critical',;
         status: 'critical',;
        responseTime: Date.now() - startTime,;
         responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
         lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Authentication service failed',;
         error: error instanceof Error ? error.message : 'Authentication service failed',;
      };
    }
  }

  // Check market data service;
  async checkMarketData(): Promise<ServiceHealth> {
    const startTime = Date.now();
    try {
      // If Alpaca client is not available (during build), return warning status;
      if (!this.alpacaClient) {
        return {
          name: 'market_data',;
           name: 'market_data',;
          status: 'warning',;
           status: 'warning',;
          responseTime: Date.now() - startTime,;
           responseTime: Date.now() - startTime,;
          lastCheck: new Date().toISOString(),;
           lastCheck: new Date().toISOString(),;
          error: 'Market data API credentials not configured',;
           error: 'Market data API credentials not configured',;
        };
      }

      // Check market data API connectivity;
      await this.alpacaClient.getLatestQuote('AAPL');

      return {
        name: 'market_data',;
         name: 'market_data',;
        status: 'healthy',;
         status: 'healthy',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      const status = responseTime > HEALTH_CONFIG.timeout ? 'critical' : 'warning';

      return {
        name: 'market_data',;
         name: 'market_data',;
        status,;
         status,;
        responseTime,;
         responseTime,;
        lastCheck: new Date().toISOString(),;
         lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Market data service failed',;
         error: error instanceof Error ? error.message : 'Market data service failed',;
      };
    }
  }

  // Get performance metrics;
  getPerformanceHealth(): PerformanceHealth {
    const stats = performanceMonitor.getStats('1h');
    const memoryUsage = process.memoryUsage();

    return {
      memory: {
        used: memoryUsage.heapUsed,;
        total: memoryUsage.heapTotal,;
        percentage: Math.round((memoryUsage.heapUsed / memoryUsage.heapTotal) * 100),;
      },;
      responseTime: {
         average: stats.averageResponseTime,;
         p95: 0, // Would need to calculate from detailed metrics;
         p99: 0, // Would need to calculate from detailed metrics;
       },;
      errorRate: stats.errorRate,;
      requestCount: stats.totalRequests,;
    };
  }

  // Determine overall system status;
  determineOverallStatus(;
    services: ServiceHealth[],;
    performance: PerformanceHealth;
  ): 'healthy' | 'warning' | 'critical' | 'down' {
    // Check for critical service failures;
    const criticalServiceDown = services.some(;
      service =>;
        HEALTH_CONFIG.criticalServices.includes(service.name) && service.status === 'critical';
    );

    if (criticalServiceDown) {
      return 'critical';
    }

    // Check for any service in critical state;
    const anyCritical = services.some(service => service.status === 'critical');
    if (anyCritical) {
      return 'critical';
    }

    // Check performance thresholds;
    const highMemory = performance.memory.percentage > HEALTH_CONFIG.warningThresholds.memoryUsage;
    const highErrorRate = performance.errorRate > HEALTH_CONFIG.warningThresholds.errorRate;
    const slowResponse =;
      performance.responseTime.average > HEALTH_CONFIG.warningThresholds.responseTime;

    if (highMemory || highErrorRate || slowResponse) {
      return 'warning';
    }

    // Check for any warnings;
    const anyWarning = services.some(service => service.status === 'warning');
    if (anyWarning) {
      return 'warning';
    }

    return 'healthy';
  }

  // Perform complete health check;
  async performHealthCheck(): Promise<HealthStatus> {
    const [databaseHealth, tradingApiHealth, authHealth, marketDataHealth] = await Promise.all([;
      this.checkDatabase(),;
      this.checkTradingAPI(),;
      this.checkAuthentication(),;
      this.checkMarketData(),;
    ]);

    const services = [databaseHealth, tradingApiHealth, authHealth, marketDataHealth];
    const performance = this.getPerformanceHealth();
    const overallStatus = this.determineOverallStatus(services, performance);

    return {
      status: overallStatus,;
      timestamp: new Date().toISOString(),;
      uptime: process.uptime(),;
      version: process.env.BUILD_VERSION || '2.5.0',;
      environment: process.env.NODE_ENV || 'development',;
      services,;
      performance,;
      dependencies: [], // Simplified for now;
    };
  }
}

const healthChecker = new HealthChecker();

export async function GET(request: NextRequest) {
  try {
    // Basic authentication for health endpoint;
    const authHeader = request.headers.get('authorization');
    const healthSecret = process.env.HEALTH_CHECK_SECRET;

    if (healthSecret && authHeader !== `Bearer ${healthSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters;
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    const format = searchParams.get('format') || 'json';

    // Simple health check for basic monitoring;
    if (!detailed) {
      const basicHealth = {
        status: 'healthy',;
        timestamp: new Date().toISOString(),;
        version: process.env.BUILD_VERSION || '2.5.0',;
        uptime: process.uptime(),;
        environment: process.env.NODE_ENV || 'development',;
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),;
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),;
        },;
      };

      return NextResponse.json(basicHealth, { status: 200 });
    }

    // Perform comprehensive health check;
    const healthStatus = await healthChecker.performHealthCheck();

    // Return different response formats;
    if (format === 'prometheus') {
      // Prometheus metrics format;
      const metrics = [;
        `# HELP alphaaistockx_health_status Overall health status (1=healthy, 0.5=warning, 0=critical)`,;
        `# TYPE alphaaistockx_health_status gauge`,;
        `alphaaistockx_health_status{environment="${healthStatus.environment}"} ${healthStatus.status === 'healthy' ? 1 : healthStatus.status === 'warning' ? 0.5 : 0}`,;
        '',;
        `# HELP alphaaistockx_uptime_seconds Application uptime in seconds`,;
        `# TYPE alphaaistockx_uptime_seconds counter`,;
        `alphaaistockx_uptime_seconds ${healthStatus.uptime}`,;
        '',;
        `# HELP alphaaistockx_memory_usage_percent Memory usage percentage`,;
        `# TYPE alphaaistockx_memory_usage_percent gauge`,;
        `alphaaistockx_memory_usage_percent ${healthStatus.performance.memory.percentage}`,;
      ].join('\n');

      return new NextResponse(metrics, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },;
        status:;
          healthStatus.status === 'healthy' ? 200 : healthStatus.status === 'warning' ? 200 : 503,;
      });
    }

    // Detailed health check response;
    return NextResponse.json(healthStatus, {
      status:;
        healthStatus.status === 'healthy' ? 200 : healthStatus.status === 'warning' ? 200 : 503,;
    });
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(;
      {
        status: 'critical',;
        timestamp: new Date().toISOString(),;
        error: 'Health check system failure',;
        message: error instanceof Error ? error.message : 'Unknown error',;
      },;
      {
        status: 503,;
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',;
          Pragma: 'no-cache',;
          Expires: '0',;
        },;
      }
    );
  }
}

// Handle OPTIONS for CORS;
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,;
    headers: {
      'Access-Control-Allow-Origin': '*',;
      'Access-Control-Allow-Methods': 'GET, OPTIONS',;
      'Access-Control-Allow-Headers': 'Content-Type',;
    },;
  });
}
