import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try { return NextResponse.json({ message: 'execute endpoint is healthy', timestamp: new Date().toISOString(), status: 'active'
    }); } catch (error) { console.error('execute GET error:', error); return NextResponse.json( { error: 'Internal server error' },
      { status: 500 }
    );
}
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
     return NextResponse.json({ message: 'execute POST successful',
      data: body,
      timestamp: new Date().toISOString()
    }) } catch (error) { console.error('execute POST error:', error); return NextResponse.json( { error: 'Internal server error' },
      { status: 500 }
    );
}
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}