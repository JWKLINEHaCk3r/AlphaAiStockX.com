'use client'

import { useEffect } from 'react'
import { Button } from '../components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error(error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Something went wrong!</h1>
          <p className="text-gray-400 text-lg">
            An unexpected error occurred while loading this page.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try again
          </Button>
          
          <div className="text-sm text-gray-500">
            Error ID: {error.digest || 'Unknown'}
          </div>
        </div>
      </div>
    </div>
  )
}
