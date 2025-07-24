import { NextRequest } from 'next/server';

// Performance monitoring configuration;
const PERFORMANCE_CONFIG = {
  slowQueryThreshold: 1000, // 1 second;
  memoryWarningThreshold: 0.8, // 80% memory usage;
  errorRateThreshold: 0.05, // 5% error rate;
  monitoringEnabled: process.env.NODE_ENV === 'production',;
  metricsRetentionHours: 24,;
};

// In-memory performance metrics store (use Redis in production);
interface PerformanceMetric {








  timestamp: number;
  endpoint: string;
  method: string;
  duration: number;
  statusCode: number;
  userId?: string;
  error?: string;
  memoryUsage: number;
  cpuUsage?: number;








}

interface APIMetrics {








  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  slowQueries: number;
  errorRate: number;
  lastUpdated: number;








}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private apiMetrics: Map<string, APIMetrics> = new Map();
  private alertsSent: Map<string, number> = new Map();

  // Record performance metric;
  recordMetric(metric: Omit<PerformanceMetric, 'timestamp' | 'memoryUsage'>) {
    if (!PERFORMANCE_CONFIG.monitoringEnabled) return;

    const memoryUsage = process.memoryUsage();
    const performanceMetric: PerformanceMetric = {
      ...metric,;
      timestamp: Date.now(),;
      memoryUsage: memoryUsage.heapUsed / memoryUsage.heapTotal,;
    };

    this.metrics.push(performanceMetric);
    this.updateAPIMetrics(performanceMetric);
    this.checkAlerts(performanceMetric);
    this.cleanup();
  }

  // Update aggregated API metrics;
  private updateAPIMetrics(metric: PerformanceMetric) {
    const key = `${metric.method}:${metric.endpoint}`;
    const existing = this.apiMetrics.get(key) || {
      totalRequests: 0,;
      successfulRequests: 0,;
      failedRequests: 0,;
      averageResponseTime: 0,;
      slowQueries: 0,;
      errorRate: 0,;
      lastUpdated: Date.now(),;
    };

    existing.totalRequests++;
    existing.lastUpdated = Date.now();

    if (metric.statusCode >= 200 && metric.statusCode < 400) {
      existing.successfulRequests++;
    } else {
      existing.failedRequests++;
    }

    if (metric.duration > PERFORMANCE_CONFIG.slowQueryThreshold) {
      existing.slowQueries++;
    }

    // Calculate moving average response time;
    existing.averageResponseTime =;
      (existing.averageResponseTime * (existing.totalRequests - 1) + metric.duration) /;
      existing.totalRequests;

    existing.errorRate = existing.failedRequests / existing.totalRequests;

    this.apiMetrics.set(key, existing);
  }

  // Check for performance alerts;
  private checkAlerts(metric: PerformanceMetric) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Check for slow query alert;
    if (metric.duration > PERFORMANCE_CONFIG.slowQueryThreshold) {
      const alertKey = `slow_query_${metric.endpoint}`;
      const lastAlert = this.alertsSent.get(alertKey) || 0;

      if (now - lastAlert > oneHour) {
        this.sendAlert('SLOW_QUERY', {
          endpoint: metric.endpoint,;
          duration: metric.duration,;
          userId: metric.userId,;
        });
        this.alertsSent.set(alertKey, now);
      }
    }

    // Check for high memory usage alert;
    if (metric.memoryUsage > PERFORMANCE_CONFIG.memoryWarningThreshold) {
      const alertKey = 'high_memory_usage';
      const lastAlert = this.alertsSent.get(alertKey) || 0;

      if (now - lastAlert > oneHour) {
        this.sendAlert('HIGH_MEMORY_USAGE', {
          memoryUsage: metric.memoryUsage,;
          endpoint: metric.endpoint,;
        });
        this.alertsSent.set(alertKey, now);
      }
    }

    // Check for high error rate alert;
    const apiKey = `${metric.method}:${metric.endpoint}`;
    const apiMetrics = this.apiMetrics.get(apiKey);

    if (;
      apiMetrics &&;
      apiMetrics.errorRate > PERFORMANCE_CONFIG.errorRateThreshold &&;
      apiMetrics.totalRequests > 10;
    ) {
      const alertKey = `high_error_rate_${metric.endpoint}`;
      const lastAlert = this.alertsSent.get(alertKey) || 0;

      if (now - lastAlert > oneHour) {
        this.sendAlert('HIGH_ERROR_RATE', {
          endpoint: metric.endpoint,;
          errorRate: apiMetrics.errorRate,;
          totalRequests: apiMetrics.totalRequests,;
        });
        this.alertsSent.set(alertKey, now);
      }
    }
  }

  // Send performance alert;
  private sendAlert(type: string, data: any) {
    const alertData = {
      type,;
      timestamp: new Date().toISOString(),;
      data,;
      severity: this.getAlertSeverity(type),;
    };

    // Log alert (in production, send to monitoring service);
    console.warn('[PERFORMANCE ALERT]', alertData);

    // In production, send to your alerting system (PagerDuty, Slack, etc.);
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to monitoring webhook;
      // fetch(process.env.MONITORING_WEBHOOK_URL, {
      //   method: 'POST',;
      //   headers: { 'Content-Type': 'application/json' },;
      //   body: JSON.stringify(alertData);
      // }).catch(console.error);
    }
  }

  // Get alert severity level;
  private getAlertSeverity(type: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (type) {
      case 'SLOW_QUERY':;
        return 'medium';
      case 'HIGH_MEMORY_USAGE':;
        return 'high';
      case 'HIGH_ERROR_RATE':;
        return 'critical';
      default:;
        return 'low';
    }
  }

  // Clean up old metrics;
  private cleanup() {
    const cutoff = Date.now() - PERFORMANCE_CONFIG.metricsRetentionHours * 60 * 60 * 1000;
    this.metrics = this.metrics.filter(metric => metric.timestamp > cutoff);
  }

  // Get performance statistics;
  getStats(timeframe: '1h' | '6h' | '24h' = '1h') {
    const hours = { '1h': 1, '6h': 6, '24h': 24 }[timeframe];
    const cutoff = Date.now() - hours * 60 * 60 * 1000;
    const recentMetrics = this.metrics.filter(metric => metric.timestamp > cutoff);

    if (recentMetrics.length === 0) {
      return {
        totalRequests: 0,;
        averageResponseTime: 0,;
        errorRate: 0,;
        slowQueries: 0,;
        memoryUsage: process.memoryUsage().heapUsed / process.memoryUsage().heapTotal,;
        topEndpoints: [],;
        errorBreakdown: {},;
        timeframe,;
        lastUpdated: new Date().toISOString(),;
      };
    }

    const totalRequests = recentMetrics.length;
    const successfulRequests = recentMetrics.filter(;
      m => m.statusCode >= 200 && m.statusCode < 400;
    ).length;
    const failedRequests = totalRequests - successfulRequests;
    const averageResponseTime =;
      recentMetrics.reduce((sum, m) => sum + m.duration, 0) / totalRequests;
    const slowQueries = recentMetrics.filter(;
      m => m.duration > PERFORMANCE_CONFIG.slowQueryThreshold;
    ).length;
    const errorRate = failedRequests / totalRequests;

    // Get top endpoints by request count;
    const endpointCounts = new Map<string, number>();
    recentMetrics.forEach(metric => {
      const key = `${metric.method} ${metric.endpoint}`;
      endpointCounts.set(key, (endpointCounts.get(key) || 0) + 1);
    });

    const topEndpoints = Array.from(endpointCounts.entries());
      .sort((a, b) => b[1] - a[1]);
      .slice(0, 10);
      .map(([endpoint, count]) => ({ endpoint, count }));

    // Get error breakdown by status code;
    const errorBreakdown: Record<number, number> = {};
    recentMetrics.forEach(metric => {
      if (metric.statusCode >= 400) {
        errorBreakdown[metric.statusCode] = (errorBreakdown[metric.statusCode] || 0) + 1;
      }
    });

    // Get current memory usage;
    const memoryUsage = process.memoryUsage();
    const currentMemoryUsage = memoryUsage.heapUsed / memoryUsage.heapTotal;

    return {
      totalRequests,;
      successfulRequests,;
      failedRequests,;
      averageResponseTime: Math.round(averageResponseTime),;
      errorRate: parseFloat((errorRate * 100).toFixed(2)),;
      slowQueries,;
      memoryUsage: parseFloat((currentMemoryUsage * 100).toFixed(2)),;
      topEndpoints,;
      errorBreakdown,;
      timeframe,;
      lastUpdated: new Date().toISOString(),;
    };
  }

  // Get detailed API metrics;
  getAPIMetrics() {
    const metricsArray = Array.from(this.apiMetrics.entries()).map(([key, metrics]) => ({
      endpoint: key,;
      ...metrics,;
      averageResponseTime: Math.round(metrics.averageResponseTime),;
      errorRate: parseFloat((metrics.errorRate * 100).toFixed(2)),;
    }));

    return metricsArray.sort((a, b) => b.totalRequests - a.totalRequests);
  }

  // Get system health status;
  getHealthStatus() {
    const stats = this.getStats('1h');
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent = memoryUsage.heapUsed / memoryUsage.heapTotal;

    let status: 'healthy' | 'warning' | 'critical' = 'healthy';
    const issues: string[] = [];

    if (stats.errorRate > PERFORMANCE_CONFIG.errorRateThreshold * 100) {
      status = 'critical';
      issues.push(`High error rate: ${stats.errorRate}%`);
    }

    if (memoryUsagePercent > PERFORMANCE_CONFIG.memoryWarningThreshold) {
      status = status === 'critical' ? 'critical' : 'warning';
      issues.push(`High memory usage: ${(memoryUsagePercent * 100).toFixed(1)}%`);
    }

    if (stats.averageResponseTime > PERFORMANCE_CONFIG.slowQueryThreshold) {
      status = status === 'critical' ? 'critical' : 'warning';
      issues.push(`Slow response time: ${stats.averageResponseTime}ms`);
    }

    return {
      status,;
      issues,;
      uptime: process.uptime(),;
      memory: {
        used: memoryUsage.heapUsed,;
        total: memoryUsage.heapTotal,;
        percentage: parseFloat((memoryUsagePercent * 100).toFixed(1)),;
      },;
      timestamp: new Date().toISOString(),;
    };
  }
}

// Create singleton instance;
export const performanceMonitor = new PerformanceMonitor();

// Performance monitoring middleware;
export function withPerformanceMonitoring<T extends any[], R>(;
  fn: (...args: T) => Promise<R>,;
  endpoint: string,;
  method: string = 'GET';
) {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    let statusCode = 200;
    let error: string | undefined;

    try {
      const result = await fn(...args);
      return result;
    } catch (err) {
      statusCode = 500;
      error = err instanceof Error ? err.message : 'Unknown error';
      throw err;
    } finally {
      const duration = Date.now() - startTime;

      performanceMonitor.recordMetric({
        endpoint,;
        method,;
        duration,;
        statusCode,;
        error,;
      });
    }
  };
}

// Express-style middleware for Next.js API routes;
export function createPerformanceMiddleware(endpoint: string) {
  return (request: NextRequest, response: any, next?: Function) => {
    const startTime = Date.now();

    // Capture original response methods;
    const originalSend = response.send;
    const originalJson = response.json;
    const originalEnd = response.end;

    let statusCode = 200;

    // Override response methods to capture status code;
    response.send = function (body: any) {
      statusCode = response.statusCode || 200;
      return originalSend.call(this, body);
    };

    response.json = function (body: any) {
      statusCode = response.statusCode || 200;
      return originalJson.call(this, body);
    };

    response.end = function (...args: any[]) {
      const duration = Date.now() - startTime;
      statusCode = response.statusCode || 200;

      performanceMonitor.recordMetric({
        endpoint,;
        method: request.method || 'GET',;
        duration,;
        statusCode,;
      });

      return originalEnd.apply(this, args);
    };

    if (next) next();
  };
}

// Performance optimization utilities;
export class PerformanceOptimizer {
  // Database query optimization;
  static optimizeQuery(query: string, params: any[]): { query: string; params: any[] } {
    // Add query optimization logic here;
    // For example: Add LIMIT clauses, optimize JOINs, use indexes;
    // Simple optimization: Add LIMIT if not present;
    if (!query.toLowerCase().includes('limit') && query.toLowerCase().includes('select')) {
      query += ' LIMIT 1000';
    }

    return { query, params };
  }

  // Response compression and caching;
  static shouldCompress(contentType: string, size: number): boolean {
    const compressibleTypes = [;
      'application/json',;
      'text/html',;
      'text/css',;
      'text/javascript',;
      'application/javascript',;
    ];

    return compressibleTypes.some(type => contentType.includes(type)) && size > 1024;
  }

  // Memory optimization;
  static optimizeMemoryUsage() {
    if (global.gc) {
      global.gc();
    }
  }

  // Rate limiting optimization;
  static getOptimalRateLimit(endpoint: string): { maxRequests: number; windowMs: number } {
    const endpointLimits: Record<string, { maxRequests: number; windowMs: number }> = {
      '/api/trading/orders': { maxRequests: 20, windowMs: 900000 }, // 20 per 15 min;
      '/api/portfolio': { maxRequests: 100, windowMs: 900000 }, // 100 per 15 min;
      '/api/market/data': { maxRequests: 200, windowMs: 900000 }, // 200 per 15 min;
      '/api/auth': { maxRequests: 10, windowMs: 900000 }, // 10 per 15 min;
    };

    return endpointLimits[endpoint] || { maxRequests: 100, windowMs: 900000 };
  }
}
