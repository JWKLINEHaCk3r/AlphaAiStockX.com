"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border-red-500/30">
            <CardHeader className="text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <CardTitle className="text-white">Something went wrong</CardTitle>
              <CardDescription className="text-slate-400">
                We encountered an unexpected error. Please try refreshing the page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error?.message || "Unknown error occurred"}
                </p>
              </div>
              <Button onClick={() => window.location.reload()} className="w-full flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
