import { Server } from 'socket.io';
import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '@/app/types/socket';

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? process.env.NEXTAUTH_URL 
          : 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    });
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // Handle market data subscriptions
      socket.on('subscribe-market-data', (symbols: string[]) => {
        console.log(`Client ${socket.id} subscribing to: ${symbols.join(', ')}`);
        symbols.forEach(symbol => {
          socket.join(`market-${symbol}`);
        });
        
        // Send initial data
        symbols.forEach(symbol => {
          const marketData = generateMockMarketData(symbol);
          socket.emit('market-data', marketData);
        });

        // Start streaming updates
        startMarketDataStream(io, symbols);
      });

      // Handle AI signals subscriptions
      socket.on('subscribe-ai-signals', (userId: string) => {
        console.log(`Client ${socket.id} subscribing to AI signals for user: ${userId}`);
        socket.join(`ai-signals-${userId}`);
        
        // Send initial signals
        const signals = generateMockAISignals();
        socket.emit('ai-signals', signals);

        // Start AI signals stream
        startAISignalsStream(io, userId);
      });

      // Handle portfolio updates subscriptions
      socket.on('subscribe-portfolio', (userId: string) => {
        console.log(`Client ${socket.id} subscribing to portfolio updates for user: ${userId}`);
        socket.join(`portfolio-${userId}`);
        
        // Send initial portfolio data
        const portfolio = generateMockPortfolioData(userId);
        socket.emit('portfolio-update', portfolio);

        // Start portfolio updates stream
        startPortfolioStream(io, userId);
      });

      // Handle social feed subscriptions
      socket.on('subscribe-social-feed', (userId: string) => {
        console.log(`Client ${socket.id} subscribing to social feed for user: ${userId}`);
        socket.join(`social-feed-${userId}`);
        
        // Start social feed stream
        startSocialFeedStream(io, userId);
      });

      // Handle trade execution notifications
      socket.on('subscribe-trade-notifications', (userId: string) => {
        console.log(`Client ${socket.id} subscribing to trade notifications for user: ${userId}`);
        socket.join(`trade-notifications-${userId}`);
      });

      // Handle unsubscriptions
      socket.on('unsubscribe-market-data', (symbols: string[]) => {
        symbols.forEach(symbol => {
          socket.leave(`market-${symbol}`);
        });
      });

      socket.on('unsubscribe-ai-signals', (userId: string) => {
        socket.leave(`ai-signals-${userId}`);
      });

      socket.on('unsubscribe-portfolio', (userId: string) => {
        socket.leave(`portfolio-${userId}`);
      });

      socket.on('unsubscribe-social-feed', (userId: string) => {
        socket.leave(`social-feed-${userId}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }
  res.end();
};

// Market data streaming
function startMarketDataStream(io: Server, symbols: string[]) {
  const interval = setInterval(() => {
    symbols.forEach(symbol => {
      const marketData = generateMockMarketData(symbol);
      io.to(`market-${symbol}`).emit('market-data', marketData);
    });
  }, 1000); // Update every second

  // Clean up after 1 hour
  setTimeout(() => {
    clearInterval(interval);
  }, 3600000);
}

// AI signals streaming
function startAISignalsStream(io: Server, userId: string) {
  const interval = setInterval(() => {
    // Generate new AI signal occasionally
    if (Math.random() < 0.1) { // 10% chance every interval
      const signal = generateMockAISignal();
      io.to(`ai-signals-${userId}`).emit('new-ai-signal', signal);
    }
  }, 10000); // Check every 10 seconds

  // Clean up after 1 hour
  setTimeout(() => {
    clearInterval(interval);
  }, 3600000);
}

// Portfolio streaming
function startPortfolioStream(io: Server, userId: string) {
  const interval = setInterval(() => {
    const portfolioUpdate = generateMockPortfolioData(userId);
    io.to(`portfolio-${userId}`).emit('portfolio-update', portfolioUpdate);
  }, 5000); // Update every 5 seconds

  // Clean up after 1 hour
  setTimeout(() => {
    clearInterval(interval);
  }, 3600000);
}

// Social feed streaming
function startSocialFeedStream(io: Server, userId: string) {
  const interval = setInterval(() => {
    // Generate new social post occasionally
    if (Math.random() < 0.05) { // 5% chance every interval
      const post = generateMockSocialPost();
      io.to(`social-feed-${userId}`).emit('new-social-post', post);
    }
  }, 15000); // Check every 15 seconds

  // Clean up after 1 hour
  setTimeout(() => {
    clearInterval(interval);
  }, 3600000);
}

// Mock data generators
function generateMockMarketData(symbol: string) {
  const basePrice = 150 + Math.random() * 300;
  const change = (Math.random() - 0.5) * 10;
  const changePercent = (change / basePrice) * 100;

  return {
    symbol,
    price: Math.round(basePrice * 100) / 100,
    change: Math.round(change * 100) / 100,
    changePercent: Math.round(changePercent * 100) / 100,
    volume: Math.floor(Math.random() * 1000000) + 100000,
    bid: Math.round((basePrice - 0.01) * 100) / 100,
    ask: Math.round((basePrice + 0.01) * 100) / 100,
    timestamp: new Date().toISOString(),
  };
}

function generateMockAISignal() {
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NVDA'];
  const actions = ['BUY', 'SELL', 'HOLD'];
  const strategies = ['Neural Ensemble', 'LSTM Momentum', 'Transformer Analysis'];

  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const basePrice = 150 + Math.random() * 300;

  return {
    id: `signal_${Date.now()}_${Math.random()}`,
    symbol,
    action,
    confidence: Math.round((0.7 + Math.random() * 0.3) * 1000) / 1000,
    currentPrice: Math.round(basePrice * 100) / 100,
    targetPrice: Math.round(basePrice * (1 + (Math.random() - 0.5) * 0.2) * 100) / 100,
    strategy: strategies[Math.floor(Math.random() * strategies.length)],
    timestamp: new Date().toISOString(),
  };
}

function generateMockAISignals() {
  return Array.from({ length: 5 }, () => generateMockAISignal());
}

function generateMockPortfolioData(userId: string) {
  const totalValue = 100000 + Math.random() * 900000;
  const dailyChange = (Math.random() - 0.5) * 10000;
  const dailyChangePercent = (dailyChange / totalValue) * 100;

  return {
    userId,
    totalValue: Math.round(totalValue * 100) / 100,
    dailyPnL: Math.round(dailyChange * 100) / 100,
    dailyPnLPercent: Math.round(dailyChangePercent * 100) / 100,
    cashBalance: Math.round((totalValue * 0.1 + Math.random() * totalValue * 0.2) * 100) / 100,
    positions: Math.floor(Math.random() * 20) + 5,
    timestamp: new Date().toISOString(),
  };
}

function generateMockSocialPost() {
  const authors = ['AI_Trader_Pro', 'MarketGuru', 'TechAnalyst', 'QuantWhiz'];
  const contents = [
    'Just spotted a massive breakout pattern in $AAPL! 🚀',
    'Market volatility increasing - time to hedge positions 📊',
    'AI models showing strong bullish signals across tech sector 🤖',
    'Options flow suggests big move coming in $TSLA ⚡',
  ];

  return {
    id: `post_${Date.now()}_${Math.random()}`,
    author: {
      name: authors[Math.floor(Math.random() * authors.length)],
      avatar: '/avatars/default.png',
      verified: true,
    },
    content: contents[Math.floor(Math.random() * contents.length)],
    timestamp: new Date().toISOString(),
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
  };
}

export default SocketHandler;
