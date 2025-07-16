import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import DashboardHeader from '@/app/components/DashboardHeader';
import DashboardSidebar from '@/app/components/DashboardSidebar';
import StatsCard from '@/app/components/StatsCard';
import QuickActions from '@/app/components/QuickActions';
import RecentActivity from '@/app/components/RecentActivity';

export default async function DashboardPage() {
  console.log('🚀 [DASHBOARD PAGE] Starting dashboard page...');
  
  // Get the current session (middleware already verified auth and setup)
  const session = await auth();
  
  if (!session || !session.user) {
    console.log('❌ [DASHBOARD PAGE] No session, redirecting to auth');
    redirect('/auth');
  }

  console.log('🔍 [DASHBOARD PAGE] User email:', session.user.email);
  console.log('🔍 [DASHBOARD PAGE] User name:', session.user.name);

  console.log('✅ [DASHBOARD PAGE] Rendering Dashboard component (middleware confirmed setup complete)');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader user={session.user} />
      
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <DashboardSidebar className="hidden lg:block" />
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {session.user.name?.split(' ')[0] || 'User'}! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                                         Here&apos;s what&apos;s happening with your resumes today.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-xl text-white">
                    <div className="text-sm opacity-90">Current Plan</div>
                    <div className="text-lg font-semibold">Premium</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Resumes"
                value={12}
                subtitle="3 active drafts"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                trend={{ value: 25, isPositive: true }}
              />
              
              <StatsCard
                title="ATS Score"
                value="87%"
                subtitle="Last scan"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                }
                trend={{ value: 12, isPositive: true }}
              />
              
              <StatsCard
                title="Applications"
                value={47}
                subtitle="This month"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                }
                trend={{ value: 8, isPositive: true }}
              />
              
              <StatsCard
                title="Success Rate"
                value="23%"
                subtitle="Interview rate"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                }
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Quick Actions */}
            <QuickActions className="mb-8" />

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2">
                <RecentActivity />
              </div>
              
              {/* Side Panel */}
              <div className="space-y-6">
                {/* Tips Card */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Pro Tip</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        Include industry-specific keywords from job descriptions to improve your ATS score by up to 40%.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">This Week</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Resume views</span>
                      <span className="font-semibold text-gray-900 dark:text-white">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Downloads</span>
                      <span className="font-semibold text-gray-900 dark:text-white">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">ATS scans</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 