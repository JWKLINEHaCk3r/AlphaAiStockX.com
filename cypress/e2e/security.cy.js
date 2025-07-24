import { Input } from '../../components/ui/input';
describe('AlphaAiStockX Security Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Security Headers', () => {
    it('should have required security headers', () => {
      cy.checkSecurityHeaders();
    });

    it('should block iframe embedding', () => {
      cy.request('/').then(response => {
        expect(response.headers['x-frame-options']).to.be.oneOf(['DENY', 'SAMEORIGIN']);
      });
    });

    it('should have Content Security Policy', () => {
      cy.request('/').then(response => {
        expect(response.headers).to.have.property('content-security-policy');
      });
    });
  });

  describe('Authentication Security', () => {
    it('should redirect unauthenticated users from protected routes', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('should prevent access to trading without authentication', () => {
      cy.request({ url: '/api/trading/orders', failOnStatusCode: false }).then(response => {
        expect(response.status).to.eq(401);
      });
    });

    it('should implement rate limiting on login attempts', () => {
      const attempts = Array.from({ length: 6 }, (_, i) => i);

      attempts.forEach(() => {
        cy.visit('/login');
        cy.get('[data-testid="email-input"]').type('test@example.com');
        cy.get('[data-testid="password-input"]').type('wrongpassword');
        cy.get('[data-testid="login-button"]').click();
      });

      // Should show rate limit error after multiple attempts;
      cy.contains('Too many login attempts').should('be.visible');
    });
  });

  describe('Input Validation', () => {
    it('should sanitize XSS attempts in form inputs', () => {
      cy.visit('/login');
      const xssPayload = '<script>alert("xss")</script>';

      cy.get('[data-testid="email-input"]').type(xssPayload);
      cy.get('[data-testid="email-input"]').should('not.contain', '<script>');
    });

    it('should validate email format', () => {
      cy.visit('/register');
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="register-button"]').click();
      cy.contains('Invalid email format').should('be.visible');
    });

    it('should enforce strong password requirements', () => {
      cy.visit('/register');
      cy.get('[data-testid="password-input"]').type('weak');
      cy.get('[data-testid="register-button"]').click();
      cy.contains('Password must be at least').should('be.visible');
    });
  });

  describe('CSRF Protection', () => {
    it('should require CSRF token for state-changing operations', () => {
      // Test CSRF protection on API endpoints;
      cy.request({
        method: 'POST',;
        url: '/api/user/settings',;
        failOnStatusCode: false,;
        body: { theme: 'dark' },;
      }).then(response => {
        expect(response.status).to.be.oneOf([403, 422]); // Should fail without CSRF token;
      });
    });
  });
});
