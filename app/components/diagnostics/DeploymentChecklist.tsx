"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Upload, Globe, Zap } from "lucide-react"

interface ChecklistItem {
  id: string
  category: string
  task: string
  description: string
  completed: boolean
  critical: boolean
}

export default function DeploymentChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Pre-deployment
    {
      id: "build",
      category: "Pre-deployment",
      task: "Run npm run build",
      description: "Generate static export in out/ directory",
      completed: false,
      critical: true,
    },
    {
      id: "verify-build",
      category: "Pre-deployment",
      task: "Verify build output",
      description: "Check that out/ directory contains all files",
      completed: false,
      critical: true,
    },
    {
      id: "test-local",
      category: "Pre-deployment",
      task: "Test locally",
      description: "Serve the out/ directory locally to test",
      completed: false,
      critical: true,
    },

    // IONOS Setup
    {
      id: "ionos-login",
      category: "IONOS Setup",
      task: "Log in to IONOS Control Panel",
      description: "Access your hosting account",
      completed: false,
      critical: true,
    },
    {
      id: "ssl-activate",
      category: "IONOS Setup",
      task: "Activate SSL Certificate",
      description: "Enable free SSL for alphaaistockx.com",
      completed: false,
      critical: true,
    },
    {
      id: "file-manager",
      category: "IONOS Setup",
      task: "Access File Manager",
      description: "Navigate to web hosting file manager",
      completed: false,
      critical: true,
    },

    // File Upload
    {
      id: "clear-directory",
      category: "File Upload",
      task: "Clear web root directory",
      description: "Remove any existing files from alphaaistockx.com folder",
      completed: false,
      critical: true,
    },
    {
      id: "upload-files",
      category: "File Upload",
      task: "Upload all files from out/",
      description: "Transfer all build files to IONOS server",
      completed: false,
      critical: true,
    },
    {
      id: "verify-upload",
      category: "File Upload",
      task: "Verify file upload",
      description: "Ensure index.html is in root directory",
      completed: false,
      critical: true,
    },

    // Configuration
    {
      id: "htaccess",
      category: "Configuration",
      task: "Upload .htaccess file",
      description: "Configure redirects and security headers",
      completed: false,
      critical: false,
    },
    {
      id: "dns-check",
      category: "Configuration",
      task: "Verify DNS settings",
      description: "Ensure domain points to IONOS servers",
      completed: false,
      critical: false,
    },

    // Testing
    {
      id: "test-https",
      category: "Testing",
      task: "Test HTTPS access",
      description: "Visit https://alphaaistockx.com",
      completed: false,
      critical: true,
    },
    {
      id: "test-mobile",
      category: "Testing",
      task: "Test mobile responsiveness",
      description: "Check site on mobile devices",
      completed: false,
      critical: false,
    },
    {
      id: "test-features",
      category: "Testing",
      task: "Test platform features",
      description: "Verify all components work correctly",
      completed: false,
      critical: true,
    },
  ])

  const toggleItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const groupedChecklist = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>,
  )

  const totalItems = checklist.length
  const completedItems = checklist.filter((item) => item.completed).length
  const criticalItems = checklist.filter((item) => item.critical).length
  const completedCritical = checklist.filter((item) => item.critical && item.completed).length

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Pre-deployment":
        return <Upload className="h-5 w-5" />
      case "IONOS Setup":
        return <Globe className="h-5 w-5" />
      case "File Upload":
        return <Upload className="h-5 w-5" />
      case "Configuration":
        return <Zap className="h-5 w-5" />
      case "Testing":
        return <CheckCircle className="h-5 w-5" />
      default:
        return <Circle className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📋 Deployment Checklist
        </h1>
        <p className="text-xl text-gray-600">Step-by-step guide to deploy AlphaAIStockX</p>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-blue-500">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {completedItems}/{totalItems}
            </div>
            <div className="text-sm text-blue-700">Total Progress</div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedItems / totalItems) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-500">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {completedCritical}/{criticalItems}
            </div>
            <div className="text-sm text-red-700">Critical Items</div>
            <div className="w-full bg-red-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCritical / criticalItems) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-green-500">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedCritical === criticalItems ? "✅" : "⏳"}</div>
            <div className="text-sm text-green-700">Ready to Deploy</div>
            <div className="text-xs text-gray-500 mt-1">
              {completedCritical === criticalItems ? "All critical items complete" : "Complete critical items first"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Checklist Items */}
      <div className="space-y-6">
        {Object.entries(groupedChecklist).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getCategoryIcon(category)}
                {category}
              </CardTitle>
              <CardDescription>
                {items.filter((item) => item.completed).length} of {items.length} completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      item.completed
                        ? "border-green-500 bg-green-50"
                        : item.critical
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-gray-50"
                    }`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${item.completed ? "line-through text-gray-500" : ""}`}>
                          {item.task}
                          {item.critical && !item.completed && (
                            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">CRITICAL</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Button */}
      <div className="text-center mt-8">
        {completedCritical === criticalItems ? (
          <div className="p-6 bg-green-50 border border-green-300 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-2">🎉 Ready for Deployment!</h3>
            <p className="text-green-700 mb-4">
              All critical items are complete. Your AlphaAIStockX platform is ready to go live!
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              <Globe className="h-4 w-4 mr-2" />
              Deploy to alphaaistockx.com
            </Button>
          </div>
        ) : (
          <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Complete Critical Items</h3>
            <p className="text-yellow-700">
              Please complete all critical items before deployment to ensure a successful launch.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
