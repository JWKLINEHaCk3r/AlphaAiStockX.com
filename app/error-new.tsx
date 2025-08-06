'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()
  
  useEffect(() => {
    // Log the error to an error reporting service in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8 animate-pulse">
          <span className="text-8xl">⚠️</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Something went wrong!
        </h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Our AI encountered an unexpected error while processing your request. Don't worry, this has been logged and our team will investigate.
        </p>
        
        {error.message && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Error Details:</h3>
            <p className="text-sm text-red-300 font-mono break-words">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-400 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          <Button 
            onClick={reset}
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transition-all duration-300 hover:scale-105"
          >
            🔄 Try Again
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => router.push('/')}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
            >
              🏠 Go Home
            </Button>
            
            <Button 
              onClick={() => window.location.reload()}
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 transition-all duration-200"
            >
              🔃 Refresh Page
            </Button>
          </div>
        </div>
        
        <div className="mt-12 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-gray-400 mb-3">
            If this error persists, please contact our support team with the error ID above.
          </p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('mailto:support@alphaai-stockx.com', '_blank')}
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            📧 Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
