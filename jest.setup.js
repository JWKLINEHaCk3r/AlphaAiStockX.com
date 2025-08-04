import '@testing-library/jest-dom';
 // Mock Next.js router; jest.mock('next/router', () => ({ useRouter: () => ({ route: '/',; pathname: '/',; query: {},; asPath: '/',;
    push: jest.fn(),;
    replace: jest.fn(),;
    reload: jest.fn(),;
    back: jest.fn(),;
    prefetch: jest.fn(),;
    beforePopState: jest.fn(),;
    events: {
      on: jest.fn(),;
      off: jest.fn(),;
      emit: jest.fn(),;
    },;
  }),;
}));
 // Mock Next.js navigation; jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),;
    replace: jest.fn(),;
    refresh: jest.fn(),;
    back: jest.fn(),;
    forward: jest.fn(),;
  }),; useSearchParams: () => new URLSearchParams(),; usePathname: () => '/',;
}));
 // Mock environment variables; process.env.NEXTAUTH_SECRET = 'test-secret'; process.env.NEXTAUTH_URL = 'http: //localhost:3000',

// Global test utilities;
global.matchMedia = global.matchMedia || function (query) {
  return {
    matches: false,;
    media: query,;
    onchange: null,;
    addListener: jest.fn(),;
    removeListener: jest.fn(),;
    addEventListener: jest.fn(),;
    removeEventListener: jest.fn(),;
    dispatchEvent: jest.fn(),;
  };
};

// Mock IntersectionObserver;
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock ResizeObserver;
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
