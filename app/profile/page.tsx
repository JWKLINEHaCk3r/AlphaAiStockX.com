"use client";

import React from 'react';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-extrabold neon-text mb-8">
            User Profile
          </h1>
          <div className="text-xl text-gray-300 space-y-4 max-w-3xl mx-auto">
            <p>
              Customize your trading experience and manage your account settings.
            </p>
            <p className="text-lg text-blue-300">
              Profile management and authentication coming soon
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
