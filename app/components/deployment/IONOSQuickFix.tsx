import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle, Upload, Globe, Lock } from "lucide-react"

export default function IONOSQuickFix() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚀 AlphaAIStockX.com is LIVE!
        </h1>
        <p className="text-xl text-gray-600">Now let's secure it and deploy your platform</p>
      </div>

      <Alert className="mb-6 border-red-500 bg-red-50">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <AlertTitle className="text-red-700">SSL Certificate Required</AlertTitle>
        <AlertDescription className="text-red-600">
          Your domain is live but needs SSL security. This is critical for a financial trading platform!
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card className="border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Lock className="h-5 w-5" />
              URGENT: Fix SSL Security (Do This First!)
            </CardTitle>
            <CardDescription>Enable HTTPS to remove the security warning</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚡ Quick SSL Setup:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    Log in to your <strong>IONOS Control Panel</strong>
                  </li>
                  <li>
                    Go to <strong>"Domains & SSL"</strong> → <strong>"SSL Certificates"</strong>
                  </li>
                  <li>
                    Find <strong>alphaaistockx.com</strong> and click <strong>"Activate Free SSL"</strong>
                  </li>
                  <li>
                    Select <strong>"DV Certificate"</strong> (Domain Validation)
                  </li>
                  <li>
                    Click <strong>"Order Now"</strong> - it's FREE!
                  </li>
                  <li>Wait 5-15 minutes for activation</li>
                </ol>
              </div>

              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <AlertDescription className="text-green-600">
                  <strong>Result:</strong> Your site will show a secure padlock 🔒 and the warning will disappear!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Upload className="h-5 w-5" />
              Step 2: Upload Your AlphaAIStockX Platform
            </CardTitle>
            <CardDescription>Deploy your Next.js application files</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">📁 Build & Upload Process:</h4>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-purple-700">A. Build Your Project:</h5>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm mt-2">npm run build</div>
                  </div>

                  <div>
                    <h5 className="font-medium text-purple-700">B. Access IONOS File Manager:</h5>
                    <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
                      <li>
                        IONOS Control Panel → <strong>"Hosting"</strong>
                      </li>
                      <li>Select your hosting package</li>
                      <li>
                        Click <strong>"File Manager"</strong>
                      </li>
                      <li>Navigate to your domain folder</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="font-medium text-purple-700">C. Upload Files:</h5>
                    <ol className="list-decimal pl-5 space-y-1 text-sm mt-2">
                      <li>Delete any existing files in the web root</li>
                      <li>
                        Upload all contents from your <code className="bg-gray-200 px-1 rounded">out/</code> folder
                      </li>
                      <li>
                        Ensure <code className="bg-gray-200 px-1 rounded">index.html</code> is in the root directory
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Globe className="h-5 w-5" />
              Step 3: Configure Domain Settings
            </CardTitle>
            <CardDescription>Optimize your domain configuration</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🌐 Domain Configuration:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Ensure <strong>www.alphaaistockx.com</strong> redirects to <strong>alphaaistockx.com</strong>
                  </li>
                  <li>
                    Set up <strong>HTTPS redirect</strong> (HTTP → HTTPS)
                  </li>
                  <li>
                    Configure <strong>custom error pages</strong>
                  </li>
                  <li>
                    Enable <strong>GZIP compression</strong> for faster loading
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500">
          <CardHeader className="bg-orange-50">
            <CardTitle className="text-orange-700">⚡ Expected Timeline</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">5-15 min</div>
                <div className="text-sm text-orange-700">SSL Activation</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">10-30 min</div>
                <div className="text-sm text-orange-700">File Upload</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">5 min</div>
                <div className="text-sm text-orange-700">Final Testing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎯 Your AlphaAIStockX Platform Will Include:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-700">🧠 AI Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Quantum AI Processing Engine</li>
                  <li>Neural Network Predictions</li>
                  <li>Real-time Market Analysis</li>
                  <li>Advanced Pattern Recognition</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-700">🛡️ Security & Compliance:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>2025 Financial Regulations</li>
                  <li>SSL Encryption</li>
                  <li>Risk Management Controls</li>
                  <li>Professional Disclaimers</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <AlertTitle className="text-green-700">🎉 Success Checklist</AlertTitle>
          <AlertDescription className="text-green-600">
            <div className="mt-2 space-y-1">
              <div>
                ✅ Domain registered: <strong>alphaaistockx.com</strong>
              </div>
              <div>
                ⏳ SSL certificate: <em>In progress</em>
              </div>
              <div>
                ⏳ Platform deployment: <em>Ready to upload</em>
              </div>
              <div>
                ⏳ HTTPS security: <em>Will be active after SSL</em>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
