"use server"

import { signIn, auth } from "@/auth"

export async function googleSignInAction(callbackUrl?: string) {
  await signIn("google", { 
    redirectTo: callbackUrl || "/dashboard"
  })
}

export interface UserCheckResponse {
  success: boolean;
  exists: boolean;
  message: string;
  data: {
    username: string;
    email: string;
    isSetupComplete: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
}

export async function checkUserStatus(): Promise<UserCheckResponse | null> {
  const startTime = Date.now();
  
  try {
    console.log('\n🚀 =============== EXTERNAL API REQUEST START ===============');
    console.log('🔍 [SERVER] Starting checkUserStatus...');
    console.log('⏰ [SERVER] Request timestamp:', new Date().toISOString());
    
    const session = await auth();
    console.log('🔍 [SERVER] Session status:', session ? '✅ Found' : '❌ Not found');
    
    if (!session?.user?.email) {
      console.log('❌ [SERVER] No session or email found');
      console.log('🚀 =============== EXTERNAL API REQUEST END (FAILED) ===============\n');
      return null;
    }

    // Extract user data
    const email = session.user.email;
    const username = session.user.name || 'user';
    const baseUrl = process.env.SERV_URL;
    
    console.log('\n📋 [REQUEST DETAILS]');
    console.log('├── Base URL:', baseUrl || '❌ NOT SET');
    console.log('├── User Email:', email);
    console.log('├── Username:', username);
    console.log('├── Encoded Email:', encodeURIComponent(email));
    console.log('└── Encoded Username:', encodeURIComponent(username));

    if (!baseUrl) {
      console.error('❌ [SERVER] SERV_URL environment variable is not set');
      console.log('🚀 =============== EXTERNAL API REQUEST END (ENV ERROR) ===============\n');
      return null;
    }

    // Build complete URL
    const apiUrl = `${baseUrl}/api/users/check?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`;
    
    // Request headers
    const requestHeaders = {
      'Content-Type': 'application/json',
      'User-Agent': 'NextJS-App/1.0',
    };

    console.log('\n🌐 [REQUEST CONFIGURATION]');
    console.log('├── Method: GET');
    console.log('├── Full URL:', apiUrl);
    console.log('├── Headers:', JSON.stringify(requestHeaders, null, 2));
    console.log('└── Cache: no-store');

    console.log('\n📡 [MAKING REQUEST...]');
    console.log('🔄 Sending request to external server...');
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: requestHeaders,
      cache: 'no-store'
    });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log('\n📨 [RESPONSE RECEIVED]');
    console.log('├── Status Code:', response.status);
    console.log('├── Status Text:', response.statusText);
    console.log('├── OK Status:', response.ok ? '✅ Success' : '❌ Failed');
    console.log('├── Headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
    console.log('└── Duration:', `${duration}ms`);

    if (!response.ok) {
      console.error('\n❌ [RESPONSE ERROR]');
      console.error('├── Status:', response.status);
      console.error('├── Status Text:', response.statusText);
      console.error('└── URL:', apiUrl);
      console.log('🚀 =============== EXTERNAL API REQUEST END (HTTP ERROR) ===============\n');
      return null;
    }

    // Get response text first for logging
    const responseText = await response.text();
    console.log('\n📄 [RAW RESPONSE]');
    console.log('Raw response text:', responseText);

    // Parse JSON
    let data: UserCheckResponse;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('\n❌ [JSON PARSE ERROR]');
      console.error('Failed to parse response as JSON:', parseError);
      console.error('Raw response was:', responseText);
      console.log('🚀 =============== EXTERNAL API REQUEST END (PARSE ERROR) ===============\n');
      return null;
    }

    console.log('\n📊 [PARSED RESPONSE DATA]');
    console.log('Complete response object:');
    console.log(JSON.stringify(data, null, 2));
    
    console.log('\n🔍 [RESPONSE ANALYSIS]');
    console.log('├── Success:', data?.success ? '✅ True' : '❌ False');
    console.log('├── User Exists:', data?.exists ? '✅ True' : '❌ False');
    console.log('├── Message:', data?.message || 'No message');
    console.log('├── User ID:', data?.data?.id || 'No ID');
    console.log('├── Username:', data?.data?.username || 'No username');
    console.log('├── Email:', data?.data?.email || 'No email');
    console.log('├── Setup Complete:', data?.data?.isSetupComplete ? '✅ True' : '❌ False');
    console.log('├── Setup Complete Type:', typeof data?.data?.isSetupComplete);
    console.log('├── Created At:', data?.data?.createdAt || 'No date');
    console.log('└── Updated At:', data?.data?.updatedAt || 'No date');

    console.log('\n✅ [REQUEST SUCCESSFUL]');
    console.log(`Request completed in ${duration}ms`);
    console.log('🚀 =============== EXTERNAL API REQUEST END (SUCCESS) ===============\n');
    
    return data;
  } catch (error) {
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.error('\n💥 [CRITICAL ERROR]');
    console.error('├── Error Type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('├── Error Message:', error instanceof Error ? error.message : String(error));
    console.error('├── Duration before error:', `${duration}ms`);
    console.error('└── Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    console.log('🚀 =============== EXTERNAL API REQUEST END (EXCEPTION) ===============\n');
    return null;
  }
} 