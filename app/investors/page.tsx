'use client';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React from 'react';

export default function InvestorsPage() {
  return (
    <main className="max-w-2xl mx-auto p-8 glassmorphic rounded-xl shadow-2xl mt-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-fuchsia-400 mb-4 drop-shadow">Invest in the Future</h1>
      <p className="text-fuchsia-200 mb-6 text-lg">
        Become a part of the most advanced AI trading and sports betting platform. Request more
        information or invest to join our journey.
      </p>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2"
          required
        />
        <textarea
          placeholder="Tell us about your interest or request more info..."
          className="bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 min-h-[100px]"
          required
        />
        <button
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-2"
        >
          Request Info / Invest
        </button>
      </form>
      <div className="text-xs text-fuchsia-300 mt-4 italic">
        * All submissions are confidential. Accredited and non-accredited investors welcome.
      </div>
    </main>
  );
}
