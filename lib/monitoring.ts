import { NextApiRequest, NextApiResponse } from 'next/server';

// System health metrics;
interface HealthMetrics {


  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
    externalAPIs: ServiceHealth;
    websocket: ServiceHealth;
  

};
  performance: {
    responseTime: number;
    memoryUsage: NodeJS.MemoryUsage;
    cpuUsage: number;
  };
  security: {
    activeUsers: number;
    failedLogins: number;
    rateLimitHits: number;
    suspiciousActivity: number;
  };
}

interface ServiceHealth {


  status: 'up' | 'down' | 'degraded';
  responseTime?: number;
  lastCheck: string;
  error?: string;


}

// Performance monitoring;
class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  private static alertThresholds = {
    responseTime: 1000, // 1 second;
    memoryUsage: 0.8, // 80% of available memory;
    errorRate: 0.05, // 5% error rate;
  };

  static recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }

    const values = this.metrics.get(name)!;
    values.push(value);

    // Keep only last 100 measurements;
    if (values.length > 100) {
      values.shift();
    }

    this.checkAlerts(name, value);
  }

  static getAverageMetric(name: string, samples: number = 10): number {
    const values = this.metrics.get(name) || [];
    const recentValues = values.slice(-samples);
    return recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length || 0;
  }

  private static checkAlerts(name: string, value: number): void {
    const average = this.getAverageMetric(name, 5);

    if (name === 'responseTime' && average > this.alertThresholds.responseTime) {
      this.sendAlert('HIGH_RESPONSE_TIME', {
        metric: name,;
        value: average,;
        threshold: this.alertThresholds.responseTime,;
      });
    }

    if (name === 'errorRate' && average > this.alertThresholds.errorRate) {
      this.sendAlert('HIGH_ERROR_RATE', {
        metric: name,;
        value: average,;
        threshold: this.alertThresholds.errorRate,;
      });
    }
  }

  private static sendAlert(type: string, data: any): void {
    console.error(`ALERT [${type}]:`, data);

    // In production, integrate with alerting services like:;
    // - PagerDuty;
    // - Slack;
    // - Email notifications;
    // - Datadog;
    // - New Relic;
  }
}

// Service health checker;
class HealthChecker {
  static async checkDatabase(): Promise<ServiceHealth> {
    const startTime = Date.now();

    try {
      // Mock database health check (replace with actual implementation);
      // Example: await prisma.$queryRaw`SELECT 1`;
      await new Promise(resolve => setTimeout(resolve, 10));

      return {
        status: 'up',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      return {
        status: 'down',;
        lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Unknown error',;
      };
    }
  }

  static async checkRedis(): Promise<ServiceHealth> {
    const startTime = Date.now();

    try {
      // Mock Redis health check (replace with actual implementation);
      // Example: await redis.ping();
      await new Promise(resolve => setTimeout(resolve, 5));

      return {
        status: 'up',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      return {
        status: 'down',;
        lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Unknown error',;
      };
    }
  }

  static async checkExternalAPIs(): Promise<ServiceHealth> {
    const startTime = Date.now();

    try {
      // Check critical external services;
      const checks = await Promise.allSettled([;
        fetch('https://paper-api.alpaca.markets/v2/account', {
          headers: { 'APCA-API-KEY-ID': 'test' },;
          signal: AbortSignal.timeout(5000),;
        }),;
        // Add other critical API checks;
      ]);

      const failures = checks.filter(result => result.status === 'rejected').length;
      const successRate = (checks.length - failures) / checks.length;

      return {
        status: successRate > 0.8 ? 'up' : successRate > 0.5 ? 'degraded' : 'down',;
        responseTime: Date.now() - startTime,;
        lastCheck: new Date().toISOString(),;
      };
    } catch (error) {
      return {
        status: 'down',;
        lastCheck: new Date().toISOString(),;
        error: error instanceof Error ? error.message : 'Unknown error',;
      };
    }
  }

  static async checkWebSocket(): Promise<ServiceHealth> {
    // Mock WebSocket health check;
    return {
      status: 'up',;
      responseTime: 5,;
      lastCheck: new Date().toISOString(),;
    };
  }
}

// System metrics collector;
class SystemMetrics {
  static getMemoryUsage(): NodeJS.MemoryUsage {
    return process.memoryUsage();
  }

  static getCPUUsage(): number {
    // Simplified CPU usage calculation;
    const usage = process.cpuUsage();
    return (usage.user + usage.system) / 1000000; // Convert to milliseconds;
  }

  static getUptime(): number {
    return process.uptime();
  }
}

// Security metrics collector;
class SecurityMetrics {
  private static securityStats = {
    activeUsers: 0,;
    failedLogins: 0,;
    rateLimitHits: 0,;
    suspiciousActivity: 0,;
  };

  static incrementFailedLogins(): void {
    this.securityStats.failedLogins++;
  }

  static incrementRateLimitHits(): void {
    this.securityStats.rateLimitHits++;
  }

  static incrementSuspiciousActivity(): void {
    this.securityStats.suspiciousActivity++;
  }

  static setActiveUsers(count: number): void {
    this.securityStats.activeUsers = count;
  }

  static getSecurityStats(): typeof SecurityMetrics.securityStats {
    return { ...this.securityStats };
  }

  static resetStats(): void {
    this.securityStats = {
      activeUsers: 0,;
      failedLogins: 0,;
      rateLimitHits: 0,;
      suspiciousActivity: 0,;
    };
  }
}

// Main health check endpoint;
export async function getSystemHealth(): Promise<HealthMetrics> {
  const startTime = Date.now();

  const [database, redis, externalAPIs, websocket] = await Promise.all([;
    HealthChecker.checkDatabase(),;
    HealthChecker.checkRedis(),;
    HealthChecker.checkExternalAPIs(),;
    HealthChecker.checkWebSocket(),;
  ]);

  const services = { database, redis, externalAPIs, websocket };

  // Determine overall system status;
  const serviceStatuses = Object.values(services).map(service => service.status);
  const downServices = serviceStatuses.filter(status => status === 'down').length;
  const degradedServices = serviceStatuses.filter(status => status === 'degraded').length;

  let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
  if (downServices > 0) {
    overallStatus = downServices > 1 ? 'unhealthy' : 'degraded';
  } else if (degradedServices > 0) {
    overallStatus = 'degraded';
  } else {
    overallStatus = 'healthy';
  }

  const responseTime = Date.now() - startTime;
  PerformanceMonitor.recordMetric('healthCheckTime', responseTime);

  return {
    status: overallStatus,;
    timestamp: new Date().toISOString(),;
    uptime: SystemMetrics.getUptime(),;
    version: process.env.npm_package_version || '2.5.0',;
    environment: process.env.NODE_ENV || 'development',;
    services,;
    performance: {
      responseTime,;
      memoryUsage: SystemMetrics.getMemoryUsage(),;
      cpuUsage: SystemMetrics.getCPUUsage(),;
    },;
    security: SecurityMetrics.getSecurityStats(),;
  };
}

// Logging utilities;
class Logger {
  private static logLevel = process.env.LOG_LEVEL || 'info';

  static debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatLog('DEBUG', message, meta));
    }
  }

  static info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.info(this.formatLog('INFO', message, meta));
    }
  }

  static warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatLog('WARN', message, meta));
    }
  }

  static error(message: string, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatLog('ERROR', message, meta));
    }
  }

  private static shouldLog(level: string): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  private static formatLog(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,;
      level,;
      message,;
      ...(meta && { meta }),;
    };
    return JSON.stringify(logEntry);
  }
}

// Request monitoring middleware;
export function monitorRequest(req: any, res: any, next: () => void): void {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function (data: any) {
    const responseTime = Date.now() - startTime;

    PerformanceMonitor.recordMetric('responseTime', responseTime);

    Logger.info('Request processed', {
      method: req.method,;
      url: req.url,;
      statusCode: res.statusCode,;
      responseTime,;
      userAgent: req.headers['user-agent'],;
      ip: req.ip || req.connection.remoteAddress,;
    });

    return originalSend.call(this, data);
  };

  next();
}

// Export for use in API routes;
export { PerformanceMonitor, HealthChecker, SystemMetrics, SecurityMetrics, Logger };
