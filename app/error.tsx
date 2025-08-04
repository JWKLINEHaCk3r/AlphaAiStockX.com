import React from 'react';
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black text-white flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-300 mb-6">An error occurred while loading this page.</p>
        <button
          onClick={reset}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover: from-red-600,
      hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
