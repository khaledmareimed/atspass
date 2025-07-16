import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🔍 [TEST-ENV] Environment test route called');
  
  return NextResponse.json({
    message: 'Environment test',
    data: {
      SERV_URL: process.env.SERV_URL || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
  });
} 