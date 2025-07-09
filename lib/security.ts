<<<<<<< HEAD
import { Input } from "../components/ui/input";
=======
import { Input } from '@/components/ui/input';
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Security configuration
export const SECURITY_CONFIG = {
  bcrypt: {
    rounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
  },
  jwt: {
    expiry: process.env.JWT_EXPIRY || '1h',
    refreshExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  },
  passwords: {
    minLength: 12,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    requireLowercase: true,
  },
  csrf: {
    tokenLength: 32,
    headerName: 'x-csrf-token',
  },
  encryption: {
    algorithm: 'aes-256-gcm',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16,
  },
};

// Password validation schema
export const passwordSchema = z
  .string()
  .min(
    SECURITY_CONFIG.passwords.minLength,
    `Password must be at least ${SECURITY_CONFIG.passwords.minLength} characters`
  )
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character');

// Email validation schema
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .max(254, 'Email too long')
  .toLowerCase();

// Input sanitization schemas
export const sanitizedStringSchema = z
  .string()
  .trim()
  .transform(str => str.replace(/[<>\"'&]/g, ''));

export const alphanumericSchema = z
  .string()
  .regex(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters allowed');

// Password hashing utilities
export class PasswordSecurity {
  static async hash(password: string): Promise<string> {
    try {
      passwordSchema.parse(password);
      return await bcrypt.hash(password, SECURITY_CONFIG.bcrypt.rounds);
    } catch (error) {
      throw new Error(`Password hashing failed: ${error.message}`);
    }
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Password verification error:', error);
      return false;
    }
  }

  static generateSecurePassword(length: number = 16): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = uppercase + lowercase + numbers + symbols;

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');
  }
}

// CSRF protection utilities
export class CSRFProtection {
  static generateToken(): string {
    return crypto.randomBytes(SECURITY_CONFIG.csrf.tokenLength).toString('hex');
  }

  static validateToken(token: string, sessionToken: string): boolean {
    if (!token || !sessionToken) return false;
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(sessionToken, 'hex'));
  }
}

// Encryption utilities
export class EncryptionUtils {
  private static getKey(): Buffer {
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
      throw new Error('ENCRYPTION_KEY environment variable not set');
    }
    return Buffer.from(key, 'hex');
  }

  static encrypt(data: string): { encrypted: string; iv: string; tag: string } {
    try {
      const key = this.getKey();
      const iv = crypto.randomBytes(SECURITY_CONFIG.encryption.ivLength);
      const cipher = crypto.createCipher(SECURITY_CONFIG.encryption.algorithm, key);

      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      const tag = cipher.getAuthTag();

      return {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex'),
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  static decrypt(encrypted: string, iv: string, tag: string): string {
    try {
      const key = this.getKey();
      const decipher = crypto.createDecipher(SECURITY_CONFIG.encryption.algorithm, key);

      decipher.setAuthTag(Buffer.from(tag, 'hex'));

      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }
}

// Input validation and sanitization
export class InputValidator {
  static sanitizeHtml(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  static validateAndSanitizeEmail(email: string): string {
    return emailSchema.parse(email);
  }

  static validatePassword(password: string): void {
    passwordSchema.parse(password);
  }

  static sanitizeString(input: string): string {
    return sanitizedStringSchema.parse(input);
  }

  static validateAlphanumeric(input: string): string {
    return alphanumericSchema.parse(input);
  }

  // SQL injection prevention
  static escapeSqlString(input: string): string {
    return input.replace(/'/g, "''").replace(/;/g, '\\;');
  }

  // XSS prevention for JSON
  static sanitizeJson(obj: any): any {
    if (typeof obj === 'string') {
      return this.sanitizeHtml(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(item => this.sanitizeJson(item));
    } else if (obj !== null && typeof obj === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitized[this.sanitizeString(key)] = this.sanitizeJson(value);
      }
      return sanitized;
    }
    return obj;
  }
}

// Session security utilities
export class SessionSecurity {
  static generateSecureSessionId(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static isSessionExpired(createdAt: Date, maxAge: number): boolean {
    const now = new Date();
    const expiryTime = new Date(createdAt.getTime() + maxAge);
    return now > expiryTime;
  }

  static hashSessionId(sessionId: string): string {
    return crypto.createHash('sha256').update(sessionId).digest('hex');
  }
}

// Rate limiting utilities
export class RateLimiter {
  private static store = new Map<string, { count: number; resetTime: number }>();

  static checkLimit(
    key: string,
    maxRequests: number,
    windowMs: number
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const current = this.store.get(key);

    if (!current || now > current.resetTime) {
      const resetTime = now + windowMs;
      this.store.set(key, { count: 1, resetTime });
      return { allowed: true, remaining: maxRequests - 1, resetTime };
    }

    if (current.count >= maxRequests) {
      return { allowed: false, remaining: 0, resetTime: current.resetTime };
    }

    current.count++;
    return {
      allowed: true,
      remaining: maxRequests - current.count,
      resetTime: current.resetTime,
    };
  }

  static cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now > value.resetTime) {
        this.store.delete(key);
      }
    }
  }
}

// Security audit logging
export class SecurityAudit {
  static logSecurityEvent(event: {
    type: 'login' | 'logout' | 'failed_login' | 'password_change' | 'suspicious_activity';
    userId?: string;
    ip: string;
    userAgent?: string;
    details?: any;
  }): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...event,
    };

    // In production, send to your security monitoring system
    console.log('SECURITY_AUDIT:', JSON.stringify(logEntry));
  }

  static logDataAccess(access: {
    userId: string;
    resource: string;
    action: 'read' | 'write' | 'delete';
    ip: string;
    success: boolean;
  }): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'data_access',
      ...access,
    };

    console.log('DATA_ACCESS_AUDIT:', JSON.stringify(logEntry));
  }
}

// Type definitions for better TypeScript support
export interface SecurityHeaders {
  'X-Content-Type-Options': string;
  'X-Frame-Options': string;
  'X-XSS-Protection': string;
  'Strict-Transport-Security': string;
  'Content-Security-Policy': string;
  'Referrer-Policy': string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors?: string[];
}

export interface SecurityEvent {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  userId?: string;
  ip: string;
  timestamp: Date;
  metadata?: any;
}
