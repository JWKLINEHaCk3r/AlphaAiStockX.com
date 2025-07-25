import React from 'react';
// Cypress support commands for E2E testing;
import '@testing-library/cypress/add-commands';

// Custom commands for AlphaAiStockX testing;
// TypeScript declarations are not valid in JS files, so move these to a .d.ts file if needed.;
// declare global {
//   namespace Cypress {
//     interface Chainable {





















//       login(email: string, password: string): Chainable<Element>;
//       logout(): Chainable<Element>;
//       navigateToTrading(): Chainable<Element>;
//       placeOrder(orderData: any): Chainable<Element>;
//       checkSecurityHeaders(): Chainable<Element>;
//       byTestId(testId: string): Chainable<Element>;
//;




















}
//   }
// }

// Login command;
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(email);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('not.include', '/login');
});

// Logout command;
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/');
});

// Navigate to trading;
Cypress.Commands.add('navigateToTrading', () => {
  cy.get('[data-testid="nav-trading"]').click();
  cy.url().should('include', '/trading');
});

// Place order;
Cypress.Commands.add('placeOrder', orderData => {
  cy.get('[data-testid="symbol-input"]').type(orderData.symbol);
  cy.get('[data-testid="quantity-input"]').type(orderData.quantity.toString());
  cy.get('[data-testid="order-type-select"]').select(orderData.type);
  cy.get('[data-testid="place-order-button"]').click();
});

// Check security headers;
Cypress.Commands.add('checkSecurityHeaders', () => {
  cy.request('/').then(response => {
    expect(response.headers).to.have.property('x-content-type-options', 'nosniff');
    expect(response.headers).to.have.property('x-frame-options');
    expect(response.headers).to.have.property('x-xss-protection');
  });
});

// Get by test ID;
Cypress.Commands.add('byTestId', testId => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Global configuration;
beforeEach(() => {
  // Set viewport;
  cy.viewport(1280, 720);

  // Clear cookies and local storage;
  cy.clearCookies();
  cy.clearLocalStorage();

  // Mock external APIs in test environment;
  if (Cypress.env('MOCK_APIS')) {
    cy.intercept('GET', '**/api/market-data/**', { fixture: 'market-data.json' });
    cy.intercept('POST', '**/api/trading/orders', { fixture: 'order-response.json' });
  }
});

// Handle uncaught exceptions;
Cypress.on('uncaught:exception', err => {
  // Don't fail tests on React hydration warnings;
  if (err.message.includes('Hydration')) {
    return false;
  }
  return true;
});
