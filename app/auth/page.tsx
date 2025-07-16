'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthCard from '../components/AuthCard';
import GoogleButton from '../components/GoogleButton';
import EmailInput from '../components/EmailInput';

function AuthPageContent() {
  const [email, setEmail] = useState('');
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const error = searchParams.get('error');

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (session) {
      // User is already authenticated, redirect to callback URL
      router.push(callbackUrl);
    }
  }, [session, status, router, callbackUrl]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session) {
    return null; // Don't render anything while redirecting
  }

  const handleMagicLinkSubmit = () => {
    console.log('Magic link sent to:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Premium App Branding */}
        <div className="text-center mb-12">
          {/* Elegant Logo */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-blue-500/20">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          {/* Clean App Name */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            ATS Pass
          </h1>

          {/* Encouraging Message */}
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
              Start building ATS-optimized resumes and get more interviews
            </p>
          </div>
        </div>

        <AuthCard>
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Welcome
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Continue to your account
            </p>
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error === 'OAuthSignin' && 'Error occurred during sign in. Please try again.'}
                  {error === 'OAuthCallback' && 'Error occurred during authentication. Please try again.'}
                  {error === 'OAuthCreateAccount' && 'Could not create account. Please try again.'}
                  {error === 'EmailCreateAccount' && 'Could not create account. Please try again.'}
                  {error === 'Callback' && 'Error occurred during authentication. Please try again.'}
                  {error === 'OAuthAccountNotLinked' && 'Email already associated with another account.'}
                  {error === 'EmailSignin' && 'Check your email for the sign in link.'}
                  {error === 'CredentialsSignin' && 'Sign in failed. Please check your credentials.'}
                  {error === 'SessionRequired' && 'Please sign in to access this page.'}
                  {!['OAuthSignin', 'OAuthCallback', 'OAuthCreateAccount', 'EmailCreateAccount', 'Callback', 'OAuthAccountNotLinked', 'EmailSignin', 'CredentialsSignin', 'SessionRequired'].includes(error) && 'An error occurred. Please try again.'}
                </p>
              </div>
            )}
          </div>

          {/* Auth Options */}
          <div className="space-y-4">
            <GoogleButton 
              text="Continue with Google"
              callbackUrl={callbackUrl}
            />
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-gray-800 px-3 text-gray-500">or</span>
              </div>
            </div>

            <EmailInput
              value={email}
              onChange={setEmail}
              placeholder="Enter your email"
              buttonText="Continue with Email"
              onSubmit={handleMagicLinkSubmit}
            />
          </div>
        </AuthCard>
      </div>

      {/* Bottom Encouragement Section */}
      <div className="w-full max-w-md mt-8 space-y-6">
        {/* Key Benefits */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">95%</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">ATS Pass Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">10K+</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Resumes Created</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">3x</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">More Interviews</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 pt-4">
          {/* Help Section */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Need help?{' '}
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
              Contact Support
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              About
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2024 ATS Pass. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AuthPageContent />
    </Suspense>
  );
} 