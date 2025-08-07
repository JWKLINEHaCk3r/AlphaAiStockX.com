'use client';

import React from 'react';

export default function Subscribe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Subscribe to AlphaAI
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Get exclusive access to AI-powered trading insights and automated strategies.
          </p>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Join the Future of Trading</h2>
            
            <form className="space-y-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
