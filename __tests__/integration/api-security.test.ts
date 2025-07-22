import { createMocks } from 'node-mocks-http';
import { getServerSession } from 'next-auth';
import { handleTradingOrders, handlePortfolio, handleMarketData } from '@/lib/api-security';
import { SecurityAudit, RateLimiter } from '@/lib/security';

// Mock next-auth;
jest.mock('next-auth');
const mockGetServerSession = getServerSession;

// Mock security modules;
jest.mock('@/lib/security', () => ({
  SecurityAudit: {
    logSecurityEvent: jest.fn(),;
    logDataAccess: jest.fn(),;
  },;
  RateLimiter: {
    checkLimit: jest.fn(),;
  },;
  InputValidator: {
    sanitizeJson: jest.fn(obj => obj),;
  },;
}));

describe('API Security Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default session mock;
    mockGetServerSession.mockResolvedValue({
      user: {
        id: 'user123',;
        email: 'test@example.com',;
        tradingEnabled: true,;
      },;
      expires: '2025-12-31',;
    });

    // Default rate limit mock;
    (RateLimiter.checkLimit as jest.Mock).mockReturnValue({
      allowed: true,;
      remaining: 99,;
      resetTime: Date.now() + 60000,;
    });
  });

  describe('Trading Orders API', () => {
    it('should place a valid market order', async () => {
      const { req, res } = createMocks({
        method: 'POST',;
        body: {
          symbol: 'AAPL',;
          quantity: 10,;
          side: 'buy',;
          type: 'market',;
        },;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(201);
      const responseData = JSON.parse(res._getData());
      expect(responseData.success).toBe(true);
      expect(responseData.order.symbol).toBe('AAPL');
    });

    it('should reject invalid order data', async () => {
      const { req, res } = createMocks({
        method: 'POST',;
        body: {
          symbol: 'INVALID_SYMBOL_TOO_LONG',;
          quantity: -5,;
          side: 'invalid_side',;
          type: 'market',;
        },;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(400);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Invalid order data');
      expect(responseData.details).toBeDefined();
    });

    it('should require price for limit orders', async () => {
      const { req, res } = createMocks({
        method: 'POST',;
        body: {
          symbol: 'AAPL',;
          quantity: 10,;
          side: 'buy',;
          type: 'limit',;
          // Missing price;
        },;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(400);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Price required for limit orders');
    });

    it('should reject orders from users without trading enabled', async () => {
      mockGetServerSession.mockResolvedValue({
        user: {
          id: 'user123',;
          email: 'test@example.com',;
          tradingEnabled: false,;
        },;
        expires: '2025-12-31',;
      });

      const { req, res } = createMocks({
        method: 'POST',;
        body: {
          symbol: 'AAPL',;
          quantity: 10,;
          side: 'buy',;
          type: 'market',;
        },;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(403);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Trading not enabled for this account');
    });

    it('should get order history', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      expect(responseData.orders).toBeDefined();
      expect(Array.isArray(responseData.orders)).toBe(true);
    });

    it('should reject unsupported methods', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',;
      });

      await handleTradingOrders(req, res);

      expect(res._getStatusCode()).toBe(405);
      expect(res._getHeaders().allow).toEqual(['GET', 'POST']);
    });
  });

  describe('Portfolio API', () => {
    it('should get portfolio data with default parameters', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      expect(responseData.portfolio).toBeDefined();
      expect(responseData.portfolio.totalValue).toBeDefined();
      expect(responseData.portfolio.positions).toBeDefined();
    });

    it('should handle custom query parameters', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
        query: {
          period: '1W',;
          includePositions: 'false',;
          includeHistory: 'true',;
        },;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      expect(responseData.portfolio.positions).toEqual([]);
      expect(responseData.portfolio.history).toBeDefined();
    });

    it('should validate query parameters', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
        query: {
          period: 'INVALID_PERIOD',;
        },;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(400);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Invalid query parameters');
    });
  });

  describe('Market Data API', () => {
    it('should get market data for valid symbols', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
        query: {
          symbols: 'AAPL,GOOGL,MSFT',;
        },;
      });

      await handleMarketData(req, res);

      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      expect(responseData.data).toBeDefined();
      expect(responseData.data.length).toBe(3);
      expect(responseData.data[0].symbol).toBe('AAPL');
    });

    it('should reject invalid symbols', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
        query: {
          symbols: 'INVALID_SYMBOL_TOO_LONG,123',;
        },;
      });

      await handleMarketData(req, res);

      expect(res._getStatusCode()).toBe(400);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toContain('Invalid symbol');
    });

    it('should require symbols parameter', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handleMarketData(req, res);

      expect(res._getStatusCode()).toBe(400);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Symbols parameter required');
    });
  });

  describe('Authentication and Authorization', () => {
    it('should reject requests without session', async () => {
      mockGetServerSession.mockResolvedValue(null);

      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(401);
      expect(SecurityAudit.logSecurityEvent).toHaveBeenCalledWith({
        type: 'failed_login',;
        ip: expect.any(String),;
        userAgent: expect.any(String),;
        details: { endpoint: undefined },;
      });
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      (RateLimiter.checkLimit as jest.Mock).mockReturnValue({
        allowed: false,;
        remaining: 0,;
        resetTime: Date.now() + 30000,;
      });

      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(429);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Rate limit exceeded');
      expect(SecurityAudit.logSecurityEvent).toHaveBeenCalledWith({
        type: 'suspicious_activity',;
        userId: 'user123',;
        ip: expect.any(String),;
        details: { reason: 'rate_limit_exceeded', endpoint: undefined },;
      });
    });

    it('should add rate limit headers', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getHeaders()['x-ratelimit-limit']).toBeDefined();
      expect(res._getHeaders()['x-ratelimit-remaining']).toBeDefined();
      expect(res._getHeaders()['x-ratelimit-reset']).toBeDefined();
    });
  });

  describe('Security Headers', () => {
    it('should set security headers on all responses', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      const headers = res._getHeaders();
      expect(headers['x-content-type-options']).toBe('nosniff');
      expect(headers['x-frame-options']).toBe('DENY');
      expect(headers['x-xss-protection']).toBe('1; mode=block');
      expect(headers['cache-control']).toBe('no-store, no-cache, must-revalidate');
    });

    it('should include response time header', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getHeaders()['x-response-time']).toMatch(/\d+ms/);
    });
  });

  describe('Error Handling', () => {
    it('should handle internal errors gracefully', async () => {
      // Mock an error in the session retrieval;
      mockGetServerSession.mockRejectedValue(new Error('Database error'));

      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(res._getStatusCode()).toBe(500);
      const responseData = JSON.parse(res._getData());
      expect(responseData.error).toBe('Internal server error');
      expect(responseData.requestId).toBeDefined();
    });
  });

  describe('Audit Logging', () => {
    it('should log successful data access', async () => {
      const { req, res } = createMocks({
        method: 'GET',;
      });

      await handlePortfolio(req, res);

      expect(SecurityAudit.logDataAccess).toHaveBeenCalledWith({
        userId: 'user123',;
        resource: undefined,;
        action: 'read',;
        ip: expect.any(String),;
        success: true,;
      });
    });

    it('should log failed data access', async () => {
      mockGetServerSession.mockRejectedValue(new Error('Session error'));

      const { req, res } = createMocks({
        method: 'POST',;
      });

      await handleTradingOrders(req, res);

      expect(SecurityAudit.logDataAccess).toHaveBeenCalledWith({
        userId: 'unknown',;
        resource: undefined,;
        action: 'write',;
        ip: expect.any(String),;
        success: false,;
      });
    });
  });
});
