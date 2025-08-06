'use client';

import React from 'react';

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 animate-bounce">
          <span className="text-8xl">🤖</span>
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Page Not Found
        </h2>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Oops! The AI couldn&apos;t locate this page. It might have been moved, deleted, or never existed in our trading universe.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <Button 
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transition-all duration-300 transform hover:scale-105"
            >
              🏠 Return Home
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/portfolio">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
              >
                📊 Portfolio
              </Button>
            </Link>
            
            <Link href="/ai-trading">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
              >
                🤖 AI Trading
              </Button>
            </Link>
            
            <Link href="/analytics">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
              >
                📈 Analytics
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-12 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-400">
            <strong>Pro Tip:</strong> Use our navigation menu to explore all features of the AlphaAI StockX platform.
          </p>
        </div>
      </div>
    </div>
  )
}