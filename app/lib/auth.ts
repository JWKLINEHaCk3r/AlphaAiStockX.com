// Next-Generation Authentication & User Management System (NextAuth v5);
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';

export interface User {







  id: string;
  email: string;
  name: string;
  username?: string;
  avatar?: string;
  tier: 'free' | 'basic' | 'pro' | 'ultimate' | 'owner';
  status: 'active' | 'suspended' | 'pending' | 'banned';
  balance: number;
  portfolioValue: number;
  totalPnL: number;
  winRate: number;
  riskScore: number;
  tradingLevel: number;
  aiAccess: boolean;
  permissions: string[];
  preferences: UserPreferences;
  kycStatus: 'pending' | 'verified' | 'rejected';
  accountType: 'cash' | 'margin' | 'crypto' | 'institutional';
  createdAt: Date;
  lastActive: Date;







}

export interface UserPreferences {







  theme: 'dark' | 'light' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    trading: boolean;
    news: boolean;
    ai: boolean;
  






};
  trading: {
    autoTrade: boolean;
    riskLevel: 'conservative' | 'moderate' | 'aggressive';
    aiAssistance: boolean;
    stopLoss: boolean;
    takeProfit: boolean;
  };
  privacy: {
    profileVisible: boolean;
    portfolioVisible: boolean;
    tradesVisible: boolean;
  };
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),;
  providers: [;
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,;
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,;
    }),;
    AppleProvider({
      clientId: process.env.APPLE_ID!,;
      clientSecret: process.env.APPLE_SECRET!,;
    }),;
    CredentialsProvider({
      name: 'credentials',;
      credentials: {
        email: { label: 'Email', type: 'email' },;
        password: { label: 'Password', type: 'password' },;
      },;
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },;
        });

        if (!user?.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,;
          email: user.email,;
          name: user.name,;
          tier: user.tier,;
          status: user.status,;
        };
      },;
    }),;
  ],;
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.tier = user.tier;
        token.status = user.status;
        token.userId = user.id;
      }
      return token;
    },;
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.tier = token.tier as string;
        session.user.status = token.status as string;
      }
      return session;
    },;
  },;
  pages: {
    signIn: '/auth/signin',;
    signUp: '/auth/signup',;
    error: '/auth/error',;
  },;
  session: {
    strategy: 'jwt',;
    maxAge: 30 * 24 * 60 * 60, // 30 days;
  },;
  secret: process.env.NEXTAUTH_SECRET,;
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// For backward compatibility, export authOptions;
export const authOptions = authConfig;

// Enhanced User Service;
export class UserService {
  static async createUser(data: {
    email: string;
    password: string;
    name: string;
    username?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,;
        password: hashedPassword,;
        name: data.name,;
        username: data.username || data.email.split('@')[0],;
        tier: 'free',;
        status: 'pending',;
        balance: 0,;
        portfolioValue: 0,;
        totalPnL: 0,;
        winRate: 0,;
        riskScore: 5,;
        tradingLevel: 1,;
        aiAccess: true,;
        kycStatus: 'pending',;
        accountType: 'cash',;
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
          trading: {
            autoTrade: false,;
            riskLevel: 'moderate',;
            aiAssistance: true,;
            stopLoss: true,;
            takeProfit: true,;
          },;
          privacy: {
            profileVisible: true,;
            portfolioVisible: false,;
            tradesVisible: false,;
          },;
        },;
      },;
    });

    // Create default portfolio;
    await prisma.portfolio.create({
      data: {
        userId: user.id,;
        name: 'Default Portfolio',;
        type: 'personal',;
        balance: 0,;
        totalValue: 0,;
        pnl: 0,;
        allocations: {},;
      },;
    });

    return user;
  }

  static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },;
      include: {
        portfolios: true,;
        trades: {
          orderBy: { createdAt: 'desc' },;
          take: 10,;
        },;
        subscriptions: true,;
        notifications: {
          where: { read: false },;
        },;
      },;
    });
  }

  static async updateUser(id: string, data: Partial<User>) {
    return await prisma.user.update({
      where: { id },;
      data,;
    });
  }

  static async upgradeUserTier(id: string, tier: User['tier']) {
    const permissions = this.getTierPermissions(tier);

    return await prisma.user.update({
      where: { id },;
      data: {
        tier,;
        permissions,;
        aiAccess: tier !== 'free',;
        updatedAt: new Date(),;
      },;
    });
  }

  static getTierPermissions(tier: User['tier']): string[] {
    const permissions: Record<User['tier'], string[]> = {
      free: ['basic_trading', 'view_portfolio'],;
      basic: ['basic_trading', 'view_portfolio', 'ai_signals', 'basic_analytics'],;
      pro: [;
        'basic_trading',;
        'view_portfolio',;
        'ai_signals',;
        'basic_analytics',;
        'advanced_trading',;
        'auto_trading',;
        'advanced_analytics',;
        'priority_support',;
      ],;
      ultimate: [;
        'basic_trading',;
        'view_portfolio',;
        'ai_signals',;
        'basic_analytics',;
        'advanced_trading',;
        'auto_trading',;
        'advanced_analytics',;
        'priority_support',;
        'unlimited_trades',;
        'ai_autopilot',;
        'custom_algorithms',;
        'api_access',;
      ],;
      owner: ['*'], // All permissions;
    };

    return permissions[tier] || permissions.free;
  }

  static async validateUser(token: JWT): Promise<boolean> {
    if (!token.userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: token.userId },;
    });

    return user?.status === 'active';
  }
}

// Real-time User Activity Tracking;
export class ActivityTracker {
  static async recordActivity(;
    userId: string,;
    activity: {
      type: string;
      details: any;
      ip?: string;
      userAgent?: string;
    }
  ) {
    await prisma.userActivity.create({
      data: {
        userId,;
        type: activity.type,;
        details: activity.details,;
        ip: activity.ip,;
        userAgent: activity.userAgent,;
        timestamp: new Date(),;
      },;
    });

    // Update last active;
    await prisma.user.update({
      where: { id: userId },;
      data: { lastActive: new Date() },;
    });
  }

  static async getRecentActivity(userId: string, limit = 50) {
    return await prisma.userActivity.findMany({
      where: { userId },;
      orderBy: { timestamp: 'desc' },;
      take: limit,;
    });
  }
}
