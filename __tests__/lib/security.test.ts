import {
  PasswordSecurity,
  CSRFProtection,
  EncryptionUtils,
  InputValidator,
  RateLimiter,
  SecurityAudit,
} from '@/lib/security';

describe('Security Utilities', () => {
  describe('PasswordSecurity', () => {
    it('should hash passwords securely', async () => {
      const password = 'SecurePassword123!@#';
      const hash = await PasswordSecurity.hash(password);

      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50);
      expect(hash.startsWith('$2b$')).toBe(true);
    });

    it('should verify passwords correctly', async () => {
      const password = 'SecurePassword123!@#';
      const hash = await PasswordSecurity.hash(password);

      const isValid = await PasswordSecurity.verify(password, hash);
      const isInvalid = await PasswordSecurity.verify('wrongpassword', hash);

      expect(isValid).toBe(true);
      expect(isInvalid).toBe(false);
    });

    it('should reject weak passwords', async () => {
      const weakPasswords = [
        'password',
        '123456',
        'short',
        'nouppercase123!',
        'NOLOWERCASE123!',
        'NoSpecialChars123',
        'NoNumbers!@#',
      ];

      for (const weakPassword of weakPasswords) {
        await expect(PasswordSecurity.hash(weakPassword)).rejects.toThrow();
      }
    });

    it('should generate secure passwords', () => {
      const password = PasswordSecurity.generateSecurePassword(16);

      expect(password.length).toBe(16);
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[0-9]/.test(password)).toBe(true);
      expect(/[^a-zA-Z0-9]/.test(password)).toBe(true);
    });
  });

  describe('CSRFProtection', () => {
    it('should generate unique CSRF tokens', () => {
      const token1 = CSRFProtection.generateToken();
      const token2 = CSRFProtection.generateToken();

      expect(token1).not.toBe(token2);
      expect(token1.length).toBe(64); // 32 bytes in hex
      expect(/^[a-f0-9]+$/.test(token1)).toBe(true);
    });

    it('should validate CSRF tokens correctly', () => {
      const token = CSRFProtection.generateToken();

      expect(CSRFProtection.validateToken(token, token)).toBe(true);
      expect(CSRFProtection.validateToken(token, 'different-token')).toBe(false);
      expect(CSRFProtection.validateToken('', token)).toBe(false);
      expect(CSRFProtection.validateToken(token, '')).toBe(false);
    });
  });

  describe('EncryptionUtils', () => {
    beforeEach(() => {
      // Mock encryption key
      process.env.ENCRYPTION_KEY =
        '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
    });

    it('should encrypt and decrypt data correctly', () => {
      const originalData = 'Sensitive trading information';
      const encrypted = EncryptionUtils.encrypt(originalData);

      expect(encrypted.encrypted).not.toBe(originalData);
      expect(encrypted.iv).toBeDefined();
      expect(encrypted.tag).toBeDefined();

      const decrypted = EncryptionUtils.decrypt(encrypted.encrypted, encrypted.iv, encrypted.tag);

      expect(decrypted).toBe(originalData);
    });

    it('should fail decryption with wrong parameters', () => {
      const originalData = 'Sensitive data';
      const encrypted = EncryptionUtils.encrypt(originalData);

      expect(() => {
        EncryptionUtils.decrypt(encrypted.encrypted, 'wrong-iv', encrypted.tag);
      }).toThrow();

      expect(() => {
        EncryptionUtils.decrypt(encrypted.encrypted, encrypted.iv, 'wrong-tag');
      }).toThrow();
    });
  });

  describe('InputValidator', () => {
    it('should sanitize HTML correctly', () => {
      const maliciousInput = '<script>alert("xss")</script>';
      const sanitized = InputValidator.sanitizeHtml(maliciousInput);

      expect(sanitized).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
    });

    it('should validate and sanitize emails', () => {
      const validEmail = 'test@example.com';
      const invalidEmail = 'not-an-email';

      expect(InputValidator.validateAndSanitizeEmail(validEmail)).toBe(validEmail);
      expect(() => InputValidator.validateAndSanitizeEmail(invalidEmail)).toThrow();
    });

    it('should validate passwords', () => {
      const validPassword = 'SecurePassword123!@#';
      const invalidPassword = 'weak';

      expect(() => InputValidator.validatePassword(validPassword)).not.toThrow();
      expect(() => InputValidator.validatePassword(invalidPassword)).toThrow();
    });

    it('should sanitize strings', () => {
      const input = '  <script>test</script>  ';
      const sanitized = InputValidator.sanitizeString(input);

      expect(sanitized).not.toContain('<script>');
      expect(sanitized.trim()).toBe(sanitized);
    });

    it('should validate alphanumeric strings', () => {
      const validString = 'abc123';
      const invalidString = 'abc-123';

      expect(InputValidator.validateAlphanumeric(validString)).toBe(validString);
      expect(() => InputValidator.validateAlphanumeric(invalidString)).toThrow();
    });

    it('should escape SQL strings', () => {
      const sqlInput = "'; DROP TABLE users; --";
      const escaped = InputValidator.escapeSqlString(sqlInput);

      expect(escaped).toBe("''; DROP TABLE users\\; --");
    });

    it('should sanitize JSON objects', () => {
      const maliciousObj = {
        name: '<script>alert("xss")</script>',
        items: ['<img src=x onerror=alert(1)>'],
        nested: {
          field: '<svg onload=alert(1)>',
        },
      };

      const sanitized = InputValidator.sanitizeJson(maliciousObj);

      expect(sanitized.name).not.toContain('<script>');
      expect(sanitized.items[0]).not.toContain('onerror');
      expect(sanitized.nested.field).not.toContain('onload');
    });
  });

  describe('RateLimiter', () => {
    beforeEach(() => {
      // Clear rate limiter store
      RateLimiter.cleanup();
    });

    it('should allow requests within limit', () => {
      const result1 = RateLimiter.checkLimit('test-key', 5, 60000);
      const result2 = RateLimiter.checkLimit('test-key', 5, 60000);

      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBe(4);
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBe(3);
    });

    it('should block requests over limit', () => {
      const maxRequests = 3;
      const windowMs = 60000;

      // Make requests up to the limit
      for (let i = 0; i < maxRequests; i++) {
        const result = RateLimiter.checkLimit('test-key', maxRequests, windowMs);
        expect(result.allowed).toBe(true);
      }

      // Next request should be blocked
      const blockedResult = RateLimiter.checkLimit('test-key', maxRequests, windowMs);
      expect(blockedResult.allowed).toBe(false);
      expect(blockedResult.remaining).toBe(0);
    });

    it('should reset after window expires', () => {
      jest.useFakeTimers();

      const result1 = RateLimiter.checkLimit('test-key', 1, 1000);
      expect(result1.allowed).toBe(true);

      const result2 = RateLimiter.checkLimit('test-key', 1, 1000);
      expect(result2.allowed).toBe(false);

      // Fast forward time
      jest.advanceTimersByTime(1001);

      const result3 = RateLimiter.checkLimit('test-key', 1, 1000);
      expect(result3.allowed).toBe(true);

      jest.useRealTimers();
    });
  });

  describe('SecurityAudit', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it('should log security events', () => {
      SecurityAudit.logSecurityEvent({
        type: 'login',
        userId: 'user123',
        ip: '192.168.1.1',
        userAgent: 'Mozilla/5.0...',
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'SECURITY_AUDIT:',
        expect.stringContaining('"type":"login"')
      );
    });

    it('should log data access events', () => {
      SecurityAudit.logDataAccess({
        userId: 'user123',
        resource: '/api/portfolio',
        action: 'read',
        ip: '192.168.1.1',
        success: true,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        'DATA_ACCESS_AUDIT:',
        expect.stringContaining('"action":"read"')
      );
    });
  });
});
