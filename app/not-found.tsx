import Link from 'next/link'
import { Button } from '@/components/ui/button-simple'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300">Page Not Found</h2>
          <p className="text-gray-400 text-lg max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Go Home
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500">
            AlphaAI StockX - AI-Powered Trading Platform
          </div>
        </div>
      </div>
    </div>
  )
}
