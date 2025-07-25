import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/app/lib/prisma';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),;
  email: z.string().email('Invalid email address'),;
  password: z.string().min(8, 'Password must be at least 8 characters'),;
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),;
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, username } = registerSchema.parse(body);

    // Check if user already exists;
    const existingUser = await prisma.user.findUnique({
      where: { email },;
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Check if username is taken;
    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },;
      });

      if (existingUsername) {
        return NextResponse.json({ error: 'Username is already taken' }, { status: 400 });
      }
    }

    // Hash password;
    const hashedPassword = await hash(password, 12);

    // Create user with initial portfolio;
    const user = await prisma.user.create({
      data: {
        name,;
        email,;
        password: hashedPassword,;
        username: username || email.split('@')[0],;
        tier: 'FREE',;
        status: 'PENDING',;
        portfolioValue: 10000,;
        totalPnL: 0,;
        winRate: 0,;
        riskScore: 5,;
        tradingLevel: 1,;
        aiAccess: true,;
        kycStatus: 'PENDING',;
        accountType: 'CASH',;
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
            showTrades: false,;
            showPnL: false,;
          },;
          trading: {
            autoTrade: false,;
            riskLevel: 'medium',;
            maxPosition: 0.1,;
          },;
        },;
        // Create default portfolio;
        portfolios: {
          create: {
            name: 'Main Portfolio',;
            description: 'Primary trading portfolio',;
            type: 'PERSONAL',;
            totalValue: 10000,;
            cashBalance: 10000,;
            dailyPnL: 0,;
            totalPnL: 0,;
            riskLevel: 'MEDIUM',;
            autoTrading: false,;
          },;
        },;
        },;
      select: {
        id: true,;
        name: true,;
        email: true,;
        username: true,;
        tier: true,;
        status: true,;
        balance: true,;
        portfolioValue: true,;
        // Create user with initial portfolio;
      }
    });
    return NextResponse.json({
      success: true,;
      message: 'User registered successfully',;
      user,;
    });
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(;
        { error: 'Validation failed', details: error.errors },;
        { status: 400 }
      );
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
