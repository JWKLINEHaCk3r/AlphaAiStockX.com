import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try { return NextResponse.json({ message: 'User profile endpoint is healthy', timestamp: new Date().toISOString(), status: 'active'
    }); } catch (error) { console.error('User profile GET error:', error); return NextResponse.json( { error: 'Internal server error' },
      { status: 500 }
    );
}
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
     return NextResponse.json({ message: 'Profile updated successfully',
      data: body,
      timestamp: new Date().toISOString()
    }) } catch (error) { console.error('User profile PUT error:', error); return NextResponse.json( { error: 'Internal server error' },
      { status: 500 }
    );
}
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}