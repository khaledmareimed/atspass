import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    console.log('\n🧪 =============== EXTERNAL API TEST START ===============');
    
    // Get test parameters from query string
    const { searchParams } = new URL(request.url);
    const testEmail = searchParams.get('email') || 'test@example.com';
    const testUsername = searchParams.get('username') || 'testuser';
    
    console.log('📋 [TEST PARAMETERS]');
    console.log('├── Test Email:', testEmail);
    console.log('├── Test Username:', testUsername);
    console.log('└── SERV_URL:', process.env.SERV_URL || '❌ NOT SET');

    if (!process.env.SERV_URL) {
      return NextResponse.json({
        error: 'SERV_URL environment variable is not set',
        solution: 'Create a .env.local file with SERV_URL=your-server-url'
      }, { status: 500 });
    }

    const apiUrl = `${process.env.SERV_URL}/api/users/check?email=${encodeURIComponent(testEmail)}&username=${encodeURIComponent(testUsername)}`;
    
    console.log('\n🌐 [TEST REQUEST]');
    console.log('├── URL:', apiUrl);
    console.log('└── Method: GET');

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Test/1.0',
      },
      cache: 'no-store'
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log('\n📨 [TEST RESPONSE]');
    console.log('├── Status:', response.status);
    console.log('├── OK:', response.ok);
    console.log('└── Duration:', `${duration}ms`);

    const responseText = await response.text();
    console.log('\n📄 [RAW RESPONSE]');
    console.log(responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      return NextResponse.json({
        error: 'Failed to parse response as JSON',
        rawResponse: responseText,
        parseError: parseError instanceof Error ? parseError.message : String(parseError)
      }, { status: 500 });
    }

    console.log('🧪 =============== EXTERNAL API TEST END ===============\n');

    return NextResponse.json({
      success: true,
      message: 'External API test completed',
      testData: {
        email: testEmail,
        username: testUsername,
        url: apiUrl,
        duration: `${duration}ms`
      },
      response: {
        status: response.status,
        ok: response.ok,
        data: data
      }
    });

  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.error('\n💥 [TEST ERROR]');
    console.error('Error:', error);
    console.error('Duration:', `${duration}ms`);
    console.log('🧪 =============== EXTERNAL API TEST END (ERROR) ===============\n');

    return NextResponse.json({
      error: 'External API test failed',
      message: error instanceof Error ? error.message : String(error),
      duration: `${duration}ms`
    }, { status: 500 });
  }
} 