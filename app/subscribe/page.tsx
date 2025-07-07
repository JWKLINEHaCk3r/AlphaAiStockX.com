'use client';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import React, { FormEvent, useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // You can add logic here to handle the submitted email
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold neon-text mb-8">Subscribe to Algo Exchange</h1>
      <p className="mb-4 text-slate-300">Receive valuable tips, news, and special promotions.</p>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full px-4 py-2 rounded bg-black/60 border border-violet-700 text-white"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="holo-btn px-8 py-3 font-bold" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}
