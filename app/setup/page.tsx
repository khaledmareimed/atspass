import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { checkUserStatus } from '@/app/lib/actions';
import Setup from '@/app/components/Setup';

export default async function SetupPage() {
  console.log('🚀 [SETUP PAGE] Starting setup page...');
  
  // Get the current session (middleware already verified auth and incomplete setup)
  const session = await auth();
  
  if (!session || !session.user) {
    console.log('❌ [SETUP PAGE] No session, redirecting to auth');
    redirect('/auth');
  }

  console.log('🔍 [SETUP PAGE] User email:', session.user.email);
  console.log('🔍 [SETUP PAGE] User name:', session.user.name);

  // Get user data for form (middleware already confirmed setup is incomplete)
  const userStatusResponse = await checkUserStatus();

  // Create user data for setup form
  const userData = userStatusResponse?.data || {
    username: session.user.name || 'user',
    email: session.user.email || '',
    isSetupComplete: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: 'temp-id'
  };

  console.log('✅ [SETUP PAGE] Rendering Setup component (middleware confirmed setup needed)');

  return (
    <Setup 
      userSession={session} 
      userData={userData} 
    />
  );
} 