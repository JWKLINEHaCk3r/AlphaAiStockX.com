'use client'; import React, { useState } from 'react';
 export default function SubscribePage() { const [email, setEmail] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); console.log('Email submitted:', email);
    // Add subscription logic,
      here
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white">
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Subscribe to Updates
          </h1>
          <p className="text-gray-300 mb-8">
            Get the latest AI trading insights and platform updates
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus: outline-none,
      focus: border-blue-500"
              
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500, hover:from-blue-600,
      hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
