import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =;
  globalForPrisma.prisma ??;
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],;
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:./dev.db',;
      },;
    },;
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Database health check;
export const checkDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

// Initialize database with default data;
export const initializeDatabase = async () => {
  try {
    // Check if we have any users;
    const userCount = await prisma.user.count();

    if (userCount === 0) {
      console.log('🌱 Seeding database with initial data...');

      // Create demo admin user;
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@alphaaistockx.com',;
          name: 'Admin User',;
          username: 'admin',;
          password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj2ukX1L7hnm', // hashed "admin123";
          tier: 'OWNER',;
          status: 'ACTIVE',;
          balance: 1000000,;
          portfolioValue: 1000000,;
          totalPnL: 0,;
          winRate: 0,;
          riskScore: 5,;
          tradingLevel: 50,;
          aiAccess: true,;
          kycStatus: 'VERIFIED',;
          accountType: 'MARGIN',;
          preferences: {
            theme: 'dark',;
            notifications: {
              email: true,;
              push: true,;
              sms: false,;
              trading: true,;
              news: true,;
              ai: true,;
            },;
            privacy: {
              showProfile: true,;
              showTrades: true,;
              showPnL: true,;
            },;
            trading: {
              autoTrade: true,;
              riskLevel: 'high',;
              maxPosition: 0.2,;
            },;
          },;
        },;
      });

      // Create demo portfolio;
      await prisma.portfolio.create({
        data: {
          userId: adminUser.id,;
          name: 'Main Portfolio',;
          description: 'Primary trading portfolio',;
          type: 'PERSONAL',;
          totalValue: 1000000,;
          cashBalance: 500000,;
          initialValue: 1000000,;
          realizedPnL: 0,;
          dailyPnL: 0,;
          totalPnL: 0,;
          riskLevel: 'HIGH',;
          autoTrading: true,;
        },;
      });

      // Create demo AI models;
      const aiModels = [;
        {
          name: 'Alpha Neural Network Pro',;
          description: 'Advanced LSTM model for momentum trading',;
          type: 'LSTM' as const,;
          parameters: {
            learningRate: 0.001,;
            epochs: 100,;
            batchSize: 32,;
            layers: 3,;
            neurons: 128,;
            dropout: 0.2,;
            optimizer: 'adam',;
            lossFunction: 'mse',;
          },;
          trainingData: {
            symbols: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],;
            timeframe: '1D',;
            features: ['price', 'volume', 'rsi', 'macd', 'bollinger'],;
            startDate: '2020-01-01',;
            endDate: '2024-01-01',;
          },;
          isPublic: true,;
          subscriptionPrice: 99.99,;
        },;
        {
          name: 'Quantum Transformer Engine',;
          description: 'Next-gen transformer model for pattern recognition',;
          type: 'TRANSFORMER' as const,;
          parameters: {
            learningRate: 0.0001,;
            epochs: 50,;
            batchSize: 16,;
            layers: 6,;
            neurons: 512,;
            dropout: 0.1,;
            optimizer: 'adamw',;
            lossFunction: 'cross_entropy',;
          },;
          trainingData: {
            symbols: ['SPY', 'QQQ', 'IWM', 'VIX'],;
            timeframe: '1H',;
            features: ['ohlcv', 'sentiment', 'options_flow', 'volume_profile'],;
            startDate: '2021-01-01',;
            endDate: '2024-01-01',;
          },;
          isPublic: true,;
          subscriptionPrice: 199.99,;
        },;
      ];

      for (const modelData of aiModels) {
        await prisma.aIModel.create({
          data: {
            creatorId: adminUser.id,;
            ...modelData,;
            status: 'ACTIVE',;
            performance: {
              accuracy: 0.85 + Math.random() * 0.1,;
              precision: 0.82 + Math.random() * 0.1,;
              recall: 0.78 + Math.random() * 0.1,;
              f1Score: 0.8 + Math.random() * 0.1,;
              sharpeRatio: 1.5 + Math.random() * 0.5,;
              maxDrawdown: 0.05 + Math.random() * 0.05,;
              totalReturn: 0.15 + Math.random() * 0.25,;
              winRate: 0.65 + Math.random() * 0.15,;
            },;
          },;
        });
      }

      console.log('✅ Database seeded successfully');
    }

    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
};

// Graceful shutdown;
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
