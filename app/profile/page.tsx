'use client';

import React from 'react';

export default function ProfilePage() {
  return (
    <main className="max-w-2xl mx-auto p-8 glassmorphic rounded-xl shadow-2xl mt-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-fuchsia-400 mb-4 drop-shadow">Your Profile</h1>
      <div className="flex flex-col gap-4">
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-fuchsia-200 font-semibold">Name:</div>
          <div className="text-white">(User Name Here)</div>
        </div>
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-fuchsia-200 font-semibold">Email:</div>
          <div className="text-white">(user@email.com)</div>
        </div>
        <div className="bg-black/30 rounded-lg p-4">
          <div className="text-fuchsia-200 font-semibold">Subscription:</div>
          <div className="text-white">Pro</div>
        </div>
        <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2">
          Edit Profile
        </button>
      </div>
      <div className="text-xs text-fuchsia-300 mt-4 italic">
        * Profile management and authentication coming soon.
      </div>
    </main>
  );
}
