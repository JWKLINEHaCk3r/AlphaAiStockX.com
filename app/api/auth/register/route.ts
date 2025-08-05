import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username } = body;

    // Mock user registration - implement your auth logic here
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      username,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
