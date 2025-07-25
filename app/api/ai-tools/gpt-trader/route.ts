// API Route for GPT-Trader Chatbot;
import { NextRequest, NextResponse } from 'next/server';
import GPTTraderChatbot from '@/app/services/ai-tools/gpt-trader-chatbot';

const chatbot = new GPTTraderChatbot();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, message, action } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    switch (action) {
      case 'initialize': {
        const { userProfile } = body;
        const welcomeMessage = await chatbot.initializeChat(userId, userProfile);
        return NextResponse.json({
          success: true,;
          data: welcomeMessage,;
          timestamp: new Date().toISOString();
        });
      }
      case 'message': {
        if (!message) {
          return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }
        const response = await chatbot.processMessage(userId, message);
        return NextResponse.json({
          success: true,;
          data: response,;
          timestamp: new Date().toISOString();
        });
      }
      case 'portfolio_simulation': {
        const { holdings } = body;
        if (!holdings || !Array.isArray(holdings)) {
          return NextResponse.json(;
            { error: 'Holdings array is required for portfolio simulation' },;
            { status: 400 }
          );
        }
        const simulation = await chatbot.simulatePortfolio(userId, holdings);
        return NextResponse.json({
          success: true,;
          data: simulation,;
          timestamp: new Date().toISOString();
        });
      }
      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: initialize, message, portfolio_simulation' }, { status: 400 });
    }
  } catch (error) {
    console.error('GPT-Trader Chatbot API Error:', error);
    return NextResponse.json({
      error: 'Failed to process request',;
      details: error instanceof Error ? error.message : 'Unknown error';
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    switch (action) {
      case 'history': {
        const history = chatbot.getChatHistory(userId);
        return NextResponse.json({
          success: true,;
          data: history,;
          count: history.length,;
          timestamp: new Date().toISOString();
        });
      }
      case 'clear': {
        chatbot.clearChatHistory(userId);
        return NextResponse.json({
          success: true,;
          message: 'Chat history cleared',;
          timestamp: new Date().toISOString();
        });
      }
      default:;
        return NextResponse.json({ error: 'Invalid action. Supported actions: history, clear' }, { status: 400 });
    }
  } catch (error) {
    console.error('GPT-Trader Chatbot GET API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
