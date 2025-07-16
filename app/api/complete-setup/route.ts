import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 [COMPLETE-SETUP API] Processing setup completion...');
    
    // Get the current session
    const session = await auth();
    
    if (!session || !session.user) {
      console.log('❌ [COMPLETE-SETUP API] No session found');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    console.log('🔍 [COMPLETE-SETUP API] Request body:', body);

    const { name, phone, email } = body;

    if (!name || !phone || !email) {
      console.log('❌ [COMPLETE-SETUP API] Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, email' },
        { status: 400 }
      );
    }

    console.log('🔍 [COMPLETE-SETUP API] User email:', email);
    console.log('🔍 [COMPLETE-SETUP API] User name:', name);
    console.log('🔍 [COMPLETE-SETUP API] User phone:', phone);

    // TODO: Replace this with actual API call to your external server
    // Example:
    /*
    const response = await fetch(`${process.env.SERV_URL}/api/users/complete-setup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        phone,
        isSetupComplete: true
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to complete setup on external server');
    }

    const result = await response.json();
    */

    // For now, simulate success
    console.log('✅ [COMPLETE-SETUP API] Setup completion simulated successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Setup completed successfully',
      data: {
        email,
        name,
        phone,
        isSetupComplete: true
      }
    });

  } catch (error) {
    console.error('❌ [COMPLETE-SETUP API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 