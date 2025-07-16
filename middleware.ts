import { auth } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// Define public routes that don't require authentication
const publicRoutes = [
  '/api/health',
  '/api/hello'
]

// Define auth routes (login, signup, etc.)
const authRoutes = [
  '/auth',
  '/login', 
  '/signup'
]

// Define setup route
const setupRoutes = [
  '/setup'
]

// Define protected routes that require authentication and setup completion
const protectedRoutes = [
  '/dashboard'
]

// Interface for user check response
interface UserCheckResponse {
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

// Function to check user status from external API
async function checkUserStatus(email: string, username: string): Promise<UserCheckResponse | null> {
  try {
    console.log('🔍 [MIDDLEWARE] Starting checkUserStatus...');
    console.log('🔍 [MIDDLEWARE] User email:', email);
    console.log('🔍 [MIDDLEWARE] User name:', username);
    console.log('🔍 [MIDDLEWARE] SERV_URL env:', process.env.SERV_URL);

    if (!process.env.SERV_URL) {
      console.error('❌ [MIDDLEWARE] SERV_URL environment variable is not set');
      return null;
    }

    const apiUrl = `${process.env.SERV_URL}/api/users/check?email=${encodeURIComponent(email)}&username=${encodeURIComponent(username)}`;
    console.log('🔍 [MIDDLEWARE] Making request to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    console.log('🔍 [MIDDLEWARE] Response status:', response.status);
    console.log('🔍 [MIDDLEWARE] Response ok:', response.ok);

    if (!response.ok) {
      console.error('❌ [MIDDLEWARE] Failed to check user status:', response.statusText);
      return null;
    }

    const data: UserCheckResponse = await response.json();
    console.log('✅ [MIDDLEWARE] API Response data:', JSON.stringify(data, null, 2));
    console.log('🔍 [MIDDLEWARE] isSetupComplete:', data?.data?.isSetupComplete);
    return data;
  } catch (error) {
    console.error('❌ [MIDDLEWARE] Error checking user status:', error);
    return null;
  }
}

export default auth(async (req: NextRequest & { auth: any }) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  console.log(`🔍 [MIDDLEWARE] Processing: ${nextUrl.pathname}`)
  console.log(`🔍 [MIDDLEWARE] User logged in: ${isLoggedIn}`)

  const isApiRoute = nextUrl.pathname.startsWith('/api/')
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isSetupRoute = setupRoutes.some(route => nextUrl.pathname.startsWith(route))
  const isProtectedRoute = protectedRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )

  // Allow all API routes
  if (isApiRoute) {
    console.log('✅ [MIDDLEWARE] API route - allowing')
    return NextResponse.next()
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log('🔍 [MIDDLEWARE] User logged in on auth page, checking setup status...')
      
      // Check user setup status before redirecting
      const userStatus = await checkUserStatus(
        req.auth.user?.email || '',
        req.auth.user?.name || 'user'
      )

      if (!userStatus) {
        console.log('❌ [MIDDLEWARE] Could not check user status, redirecting to dashboard anyway')
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
      }

      if (userStatus.data.isSetupComplete) {
        console.log('✅ [MIDDLEWARE] Setup complete, redirecting to dashboard')
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
      } else {
        console.log('⚠️ [MIDDLEWARE] Setup incomplete, redirecting to setup')
        return NextResponse.redirect(new URL('/setup', nextUrl))
      }
    }
    console.log('✅ [MIDDLEWARE] Auth route - allowing')
    return NextResponse.next()
  }

  // Handle setup routes
  if (isSetupRoute) {
    if (!isLoggedIn) {
      console.log('❌ [MIDDLEWARE] Setup route requires auth, redirecting to auth')
      return NextResponse.redirect(new URL('/auth', nextUrl))
    }
    
    console.log('🔍 [MIDDLEWARE] User accessing setup page, checking if setup is already complete...')
    
    // Check if user has already completed setup
    const userStatus = await checkUserStatus(
      req.auth.user?.email || '',
      req.auth.user?.name || 'user'
    )

    if (userStatus && userStatus.data.isSetupComplete) {
      console.log('✅ [MIDDLEWARE] Setup already complete, redirecting to dashboard')
      return NextResponse.redirect(new URL('/dashboard', nextUrl))
    }
    
    console.log('✅ [MIDDLEWARE] Setup route - allowing (setup needed)')
    return NextResponse.next()
  }

  // Handle protected routes
  if (isProtectedRoute) {
    if (!isLoggedIn) {
      console.log('❌ [MIDDLEWARE] Protected route requires auth, redirecting to auth')
      // Redirect unauthenticated users to auth page
      let callbackUrl = nextUrl.pathname
      if (nextUrl.search) {
        callbackUrl += nextUrl.search
      }
      
      const encodedCallbackUrl = encodeURIComponent(callbackUrl)
      return NextResponse.redirect(
        new URL(`/auth?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      )
    }

    console.log('🔍 [MIDDLEWARE] User accessing protected route, checking setup status...')
    
    // User is logged in, check setup status
    const userStatus = await checkUserStatus(
      req.auth.user?.email || '',
      req.auth.user?.name || 'user'
    )

    if (!userStatus) {
      console.log('❌ [MIDDLEWARE] Could not check user status, allowing access anyway')
      return NextResponse.next()
    }

    if (!userStatus.data.isSetupComplete) {
      console.log('⚠️ [MIDDLEWARE] Setup incomplete, redirecting to setup')
      return NextResponse.redirect(new URL('/setup', nextUrl))
    }

    console.log('✅ [MIDDLEWARE] Setup complete, allowing access to protected route')
    return NextResponse.next()
  }

  // Handle root route
  if (nextUrl.pathname === '/') {
    if (isLoggedIn) {
      console.log('🔍 [MIDDLEWARE] Root route with logged in user, checking setup status...')
      
      // Check user setup status before redirecting
      const userStatus = await checkUserStatus(
        req.auth.user?.email || '',
        req.auth.user?.name || 'user'
      )

      if (!userStatus) {
        console.log('❌ [MIDDLEWARE] Could not check user status, redirecting to dashboard anyway')
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
      }

      if (userStatus.data.isSetupComplete) {
        console.log('✅ [MIDDLEWARE] Setup complete, redirecting to dashboard')
        return NextResponse.redirect(new URL('/dashboard', nextUrl))
      } else {
        console.log('⚠️ [MIDDLEWARE] Setup incomplete, redirecting to setup')
        return NextResponse.redirect(new URL('/setup', nextUrl))
      }
    }
    console.log('✅ [MIDDLEWARE] Root route - allowing')
    return NextResponse.next()
  }

  // Allow access to public routes
  if (isPublicRoute) {
    console.log('✅ [MIDDLEWARE] Public route - allowing')
    return NextResponse.next()
  }

  console.log('✅ [MIDDLEWARE] Default - allowing')
  return NextResponse.next()
})

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 