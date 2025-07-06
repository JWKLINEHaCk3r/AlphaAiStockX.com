import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Home, TrendingUp, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-background opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <Card className="glass-card neon-border w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center animate-pulse-glow">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white holographic-text">404 - Page Not Found</CardTitle>
          <CardDescription className="text-muted-foreground">
            This quantum pathway doesn't exist in our AI trading universe.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-400">
            Don't worry, even our quantum AI can't predict every path!
          </div>
          <div className="flex flex-col gap-3">
            <Button
              asChild
              className="btn-primary w-full group"
              size="lg"
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Return to Home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="glass-card w-full group"
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Trading Dashboard
              </Link>
            </Button>
          </div>
          <div className="text-center text-xs text-gray-500 mt-6">
            AlphaAIStockX - Your AI Trading Companion
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
