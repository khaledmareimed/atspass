'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <button 
      onClick={handleSignOut}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors duration-200"
    >
      Logout
    </button>
  );
} 