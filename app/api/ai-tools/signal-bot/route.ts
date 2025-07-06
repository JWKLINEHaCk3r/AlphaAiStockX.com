// API Route for AI Signal Bot
import { NextRequest, NextResponse } from 'next/server';
import AISignalBot from '@/app/services/ai-tools/signal-bot';

const signalBot = new AISignalBot();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    const stream = searchParams.get('stream') === 'true';

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol parameter is required' },
        { status: 400 }
      );
    }

    if (stream) {
      // Server-Sent Events for real-time signals
      const encoder = new TextEncoder();
      
      const stream = new ReadableStream({
        async start(controller) {
          const signalGenerator = signalBot.streamSignals([symbol], 30000); // 30 seconds
          
          for await (const signal of signalGenerator) {
            const data = `data: ${JSON.stringify(signal)}\n\n`;
            controller.enqueue(encoder.encode(data));
            
            // Add delay to prevent overwhelming
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Single signal generation
      const signal = await signalBot.generateSignal(symbol);
      
      return NextResponse.json({
        success: true,
        data: signal,
        timestamp: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Signal Bot API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate signal', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols, intervalMs } = body;

    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { error: 'Symbols array is required' },
        { status: 400 }
      );
    }

    const signals = [];
    for (const symbol of symbols) {
      try {
        const signal = await signalBot.generateSignal(symbol);
        signals.push(signal);
      } catch (error) {
        console.error(`Error generating signal for ${symbol}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      data: signals,
      count: signals.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Bulk Signal Generation Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate bulk signals' },
      { status: 500 }
    );
  }
}
