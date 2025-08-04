// Application configuration and constants;
export const APP_CONFIG = {
  name: 'AlphaAIStockX', version: '2.0.0', description: 'Next-Level AI Trading Platform', url: process.env.NEXT_PUBLIC_APP_URL || 'https://alphaaistockx.com', api: { baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000', wsUrl: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8001',
    timeout: 30000
  },
  features: {
      voiceControl: true,
    darkMode: true,
    advancedCharts: true,
    aiTrading: true,
    realTimeData: true,
    threeD: true
  },
  ai: { models: { gpt4: 'gpt-4o', claude: 'claude-3-opus', custom: 'alpha-ai-v2'
    },
    agents: 47;
    accuracy: 0.987,
    executionSpeed: 0.003, // seconds;
  };
  trading: {
      maxPositions: 50,
    riskLimit: 0.02, // 2% max risk per trade;
    defaultQuantity: 100,
    minTradeAmount: 1;
    maxTradeAmount: 1000000
  },
  ui: { theme: { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#ec4899', background: '#0f0f23', surface: '#1e1e2e', text: '#ffffff', textSecondary: '#a1a1aa'
    },
    animations: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)';
    };
    breakpoints: {
      sm: 640,
      md: 768;
    lg: 1024, xl: 1280, '2xl': 1536;
    };
  };
  storage: { keys: { authToken: 'auth_token', userPrefs: 'user_preferences', theme: 'theme', watchlist: 'watchlist', portfolio: 'portfolio_cache'
    },
  };
  limits: {
      searchResults: 20,
    chartDataPoints: 1000;
    newsArticles: 50,
    aiSignals: 100;
    portfolioHistory: 365, // days;
  };
} as const;

// Market hours configuration;
export const MARKET_HOURS = { NYSE: { timezone: 'America/New_York', open: '09:30', close: '16:00', preMarket: '04:00', afterHours: '20:00'
  }, NASDAQ: { timezone: 'America/New_York', open: '09:30', close: '16:00', preMarket: '04:00', afterHours: '20:00'
  }, CRYPTO: { timezone: 'UTC', open: '00:00', close: '23:59', preMarket: '00:00', afterHours: '23:59'
  },
} as const;

// API endpoints;
export const API_ENDPOINTS = { auth: { login: '/auth/login', register: '/auth/register', logout: '/auth/logout', refresh: '/auth/refresh', profile: '/auth/profile'
  }, stocks: { search: '/stocks/search', quote: '/stocks/quote', history: '/stocks/history', news: '/stocks/news', fundamentals: '/stocks/fundamentals'
  }, portfolio: { get: '/portfolio', positions: '/portfolio/positions', history: '/portfolio/history', performance: '/portfolio/performance'
  }, trading: { order: '/trading/order', orders: '/trading/orders', positions: '/trading/positions', balance: '/trading/balance'
  }, ai: { signals: '/ai/signals', analysis: '/ai/analysis', models: '/ai/models', agents: '/ai/agents'
  }, market: { status: '/market/status', indices: '/market/indices', movers: '/market/movers', sectors: '/market/sectors'
  },
} as const;

// WebSocket event types; export const WS_EVENTS = { CONNECT: 'connect', DISCONNECT: 'disconnect', ERROR: 'error', STOCK_UPDATE: 'stock_update', PORTFOLIO_UPDATE: 'portfolio_update', TRADE_UPDATE: 'trade_update', AI_SIGNAL: 'ai_signal', MARKET_STATUS: 'market_status', NEWS_UPDATE: 'news_update'
} as const;

// Stock symbols for demo/testing; export const DEMO_SYMBOLS = [ 'AAPL'; 'MSFT'; 'GOOGL'; 'AMZN'; 'TSLA'; 'NVDA'; 'META'; 'NFLX'; 'AMD'; 'BABA'; 'UBER'; 'SNAP'; 'COIN'; 'RBLX'; 'HOOD';
] as const;

// AI agent names and specializations; export const AI_AGENTS = [ { name: 'Alpha-1', specialization: 'Technical Analysis', accuracy: 0.94 }, { name: 'Beta-2', specialization: 'Fundamental Analysis', accuracy: 0.91 }, { name: 'Gamma-3', specialization: 'Sentiment Analysis', accuracy: 0.89 }, { name: 'Delta-4', specialization: 'Risk Management', accuracy: 0.96 }, { name: 'Epsilon-5', specialization: 'Portfolio Optimization', accuracy: 0.93 }, { name: 'Zeta-6', specialization: 'Market Timing', accuracy: 0.88 }, { name: 'Eta-7', specialization: 'Options Trading', accuracy: 0.92 }, { name: 'Theta-8', specialization: 'Crypto Analysis', accuracy: 0.87 }
] as const;

// Error messages; export const ERROR_MESSAGES = { NETWORK_ERROR: 'Network connection failed. Please check your internet connection.', AUTH_REQUIRED: 'Authentication required. Please log in to continue.', INSUFFICIENT_FUNDS: 'Insufficient funds for this transaction.', MARKET_CLOSED: 'Market is currently closed. Orders will be queued.', INVALID_SYMBOL: 'Invalid stock symbol. Please check and try again.', ORDER_FAILED: 'Order execution failed. Please try again.', DATA_UNAVAILABLE: 'Data temporarily unavailable. Please try again later.', PERMISSION_DENIED: 'Permission denied. Upgrade your subscription to access this feature.'
} as const;

// Success messages; export const SUCCESS_MESSAGES = { ORDER_PLACED: 'Order placed successfully!', ORDER_FILLED: 'Order filled successfully!', PORTFOLIO_UPDATED: 'Portfolio updated successfully!', SETTINGS_SAVED: 'Settings saved successfully!', PROFILE_UPDATED: 'Profile updated successfully!', WATCHLIST_UPDATED: 'Watchlist updated successfully!'
} as const;

// Animation presets; export const ANIMATIONS = { fadeIn: 'animate-fade-in', slideUp: 'animate-slide-up', slideDown: 'animate-slide-down', slideLeft: 'animate-slide-left', slideRight: 'animate-slide-right', scaleIn: 'animate-scale-in', pulse: 'animate-pulse', bounce: 'animate-bounce', spin: 'animate-spin', ping: 'animate-ping'
} as const;

// Chart configuration;
export const CHART_CONFIG = { colors: { bullish: '#10b981', bearish: '#ef4444', neutral: '#6b7280', volume: '#3b82f6', grid: '#374151', background: 'transparent'
  }, timeframes: [ { label: '1D', value: '1D', minutes: 1440 }, { label: '1W', value: '1W', minutes: 10080 }, { label: '1M', value: '1M', minutes: 43200 }, { label: '3M', value: '3M', minutes: 129600 }, { label: '1Y', value: '1Y', minutes: 525600 }, { label: 'ALL', value: 'ALL', minutes: 0 }
  ]; indicators: [ 'SMA', 'EMA'; 'RSI'; 'MACD'; 'Bollinger Bands'; 'Volume'; 'Support/Resistance'; 'Fibonacci';
  ];
} as const;

// Export types for configuration;
export type AppConfigType = typeof APP_CONFIG;
export type MarketHoursType = typeof MARKET_HOURS;
export type APIEndpointsType = typeof API_ENDPOINTS;
export type WSEventsType = typeof WS_EVENTS;
export type DemoSymbolsType = typeof DEMO_SYMBOLS;
export type AIAgentsType = typeof AI_AGENTS;
 // Utility functions; export const isProduction = () => process.env.NODE_ENV === 'production'; export const isDevelopment = () => process.env.NODE_ENV === 'development';
export const isMarketHours = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  // Weekend check (0 = Sunday
               6 = Saturday);
  if (day === 0 || day === 6) return false;

  // Market hours: 9:30 AM -,
      4: 00 PM EST
              
  return hour >= 9 && hour < 16,
};

export default APP_CONFIG;
