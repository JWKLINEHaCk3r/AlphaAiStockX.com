import React from 'react';
'use client';
export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
          Investor Relations
        </h1>
        <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
          Join the future of AI-powered trading and investment
        </p>
        
        <div className="max-w-md mx-auto">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus: outline-none,
      focus: border-fuchsia-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30, focus:outline-none,
      focus: border-fuchsia-500"
              required
            />
            <input
              type="text"
              placeholder="Company/Organization"
              
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30, focus: outline-none,
      focus:border-fuchsia-500"
            />
            <textarea
              placeholder="Investment Inquiry"
              rows={4}
              className="w-full bg-black/30 text-fuchsia-100 rounded-lg px-4 py-2 border border-fuchsia-500/30 focus: outline-none,
      focus: border-fuchsia-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600, hover:from-fuchsia-700,
      hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}