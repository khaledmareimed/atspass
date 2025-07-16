import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      { 
        message: 'Hello from API!',
        timestamp: new Date().toISOString(),
        method: 'GET'
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    return NextResponse.json(
      { 
        message: 'Data received successfully',
        data: body,
        timestamp: new Date().toISOString(),
        method: 'POST'
      },
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or Internal Server Error' },
      { status: 400 }
    );
  }
} 