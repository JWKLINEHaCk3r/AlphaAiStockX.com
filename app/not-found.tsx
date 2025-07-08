import React from 'react';
// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
<<<<<<< HEAD
=======
import Button from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, TrendingUp, AlertCircle } from 'lucide-react';
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400 mb-6">This page doesn't exist in our AI trading universe.</p>
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          Return Home
        </Link>
      </div>
    </div>
  );
}
