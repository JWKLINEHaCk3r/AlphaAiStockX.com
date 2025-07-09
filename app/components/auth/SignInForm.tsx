<<<<<<< HEAD
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from '../../../components/ui/card';
import { AlertDescription } from "../../../components/ui/alert";
import { Alert } from "../../../components/ui/alert";
import { Checkbox } from "../../../components/ui/checkbox";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardFooter } from "../../../components/ui/card";
import { CardDescription } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
'use client';
=======
import { CardTitle } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardFooter } from '@/components/ui/card';
import { CardDescription } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
('use client');
>>>>>>> Fix: All import/export, logic, and formatting issues in AIStockTips.tsx and related UI components. Ensure strictNullChecks, Prettier, and robust production standards. Ready for deployment.

<<<<<<< HEAD
import React, { useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> 6bf02c1 (fix: restore ignoredBuiltDependencies and update Netlify config for stable deploys)
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';

interface SignInFormProps {
  onSignIn: (data: { email: string; name: string }) => void;
  onSwitchToSignUp: () => void;
  onForgotPassword: () => void;
}

export default function SignInForm({
  onSignIn,
  onSwitchToSignUp,
  onForgotPassword,
}: SignInFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simple validation
      if (!email || !password) {
        throw new Error('Please enter both email and password');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // In a real app, you would call an authentication API here
      // For demo purposes, we'll accept any valid-looking input
      onSignIn({ email, name: email.split('@')[0] });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to sign in. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-black/40 border-purple-500/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Sign In</CardTitle>
        <CardDescription className="text-gray-400">
          Access your AlphaAI StockX account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10 bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Button
                variant="link"
                className="text-purple-400 hover:text-purple-300 p-0 h-auto text-xs"
                onClick={onForgotPassword}
                type="button"
              >
                Forgot password?
              </Button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10 bg-black/20 border-purple-500/30 text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked: boolean) => setRememberMe(!!checked)}
              className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-purple-500/20 pt-4">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <Button
            variant="link"
            className="text-purple-400 hover:text-purple-300 p-0 h-auto"
            onClick={onSwitchToSignUp}
          >
            Sign up
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}
