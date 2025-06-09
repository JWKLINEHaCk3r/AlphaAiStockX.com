import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Info, Clock, Globe, Lock, Upload, Settings } from "lucide-react"

export default function IONOSStepByStep() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚀 AlphaAIStockX → IONOS Deployment
        </h1>
        <p className="text-xl text-gray-600">Complete step-by-step guide for alphaaistockx.com</p>
        <Badge variant="outline" className="mt-2">
          Estimated Time: 30-45 minutes
        </Badge>
      </div>

      <Alert className="mb-6 border-green-500 bg-green-50">
        <CheckCircle className="h-5 w-5 text-green-500" />
        <AlertTitle className="text-green-700">✅ Domain Ready</AlertTitle>
        <AlertDescription className="text-green-600">
          Your domain <strong>alphaaistockx.com</strong> is registered and pointing to IONOS servers!
        </AlertDescription>
      </Alert>

      <div className="space-y-8">
        {/* Step 1: Build Your Project */}
        <Card className="border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <Settings className="h-5 w-5 text-blue-600" />
              Build Your AlphaAIStockX Project
            </CardTitle>
            <CardDescription>Prepare your Next.js application for deployment</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                <div className="text-green-400 mb-2"># Navigate to your project directory</div>
                <div className="text-white">cd /path/to/your/alphaaistockx-project</div>
                <div className="text-green-400 mt-4 mb-2"># Install dependencies (if needed)</div>
                <div className="text-white">npm install</div>
                <div className="text-green-400 mt-4 mb-2"># Build the project for production</div>
                <div className="text-white">npm run build</div>
              </div>

              <Alert className="border-blue-500 bg-blue-50">
                <Info className="h-5 w-5 text-blue-500" />
                <AlertDescription className="text-blue-600">
                  This creates an <code className="bg-white px-2 py-1 rounded">out/</code> folder with all your static
                  files ready for upload.
                </AlertDescription>
              </Alert>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Success Indicators:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700">
                  <li>Build completes without critical errors</li>
                  <li>
                    <code className="bg-white px-1 rounded">out/</code> folder is created
                  </li>
                  <li>
                    <code className="bg-white px-1 rounded">out/index.html</code> exists
                  </li>
                  <li>File size is reasonable (typically 10-50MB)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Access IONOS Control Panel */}
        <Card className="border-purple-500">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <Globe className="h-5 w-5 text-purple-600" />
              Access IONOS Control Panel
            </CardTitle>
            <CardDescription>Log in and navigate to your hosting settings</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🌐 Login Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>
                      Go to <strong>ionos.com</strong>
                    </li>
                    <li>
                      Click <strong>"Sign In"</strong> (top right)
                    </li>
                    <li>Enter your IONOS credentials</li>
                    <li>Access your Control Panel</li>
                  </ol>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">📁 Navigation Path:</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-sm">
                    <li>
                      <strong>Hosting</strong> (main menu)
                    </li>
                    <li>Select your hosting package</li>
                    <li>
                      Look for <strong>"File Manager"</strong>
                    </li>
                    <li>
                      Or <strong>"WebFTP"</strong> option
                    </li>
                  </ol>
                </div>
              </div>

              <Alert className="border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <AlertDescription className="text-yellow-600">
                  <strong>Can't find File Manager?</strong> Look for "Website Builder", "FTP Access", or contact IONOS
                  support for guidance.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Navigate to Web Root */}
        <Card className="border-orange-500">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <Upload className="h-5 w-5 text-orange-600" />
              Navigate to Your Domain Folder
            </CardTitle>
            <CardDescription>Find the correct directory for alphaaistockx.com</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">📂 Common Directory Structures:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>/alphaaistockx.com/</strong> <span className="text-gray-500">← Most likely location</span>
                  </div>
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>/htdocs/alphaaistockx.com/</strong>{" "}
                    <span className="text-gray-500">← Alternative path</span>
                  </div>
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>/public_html/</strong> <span className="text-gray-500">← If main domain</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🎯 What You're Looking For:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700">
                  <li>
                    A folder named <strong>alphaaistockx.com</strong>
                  </li>
                  <li>This is your "web root" or "document root"</li>
                  <li>Files here will be accessible at https://alphaaistockx.com</li>
                  <li>May contain placeholder files from IONOS</li>
                </ul>
              </div>

              <Alert className="border-blue-500 bg-blue-50">
                <Info className="h-5 w-5 text-blue-500" />
                <AlertDescription className="text-blue-600">
                  <strong>Pro Tip:</strong> If you see multiple folders, look for one that matches your domain name
                  exactly.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Clear Existing Files */}
        <Card className="border-red-500">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Clear Existing Files (Important!)
            </CardTitle>
            <CardDescription>Remove IONOS placeholder files</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Alert className="border-red-500 bg-red-50">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-700">⚠️ Critical Step</AlertTitle>
                <AlertDescription className="text-red-600">
                  You MUST delete existing files in your domain folder before uploading your platform.
                </AlertDescription>
              </Alert>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">🗑️ Files to Delete:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
                  <li>
                    <strong>index.html</strong> (IONOS placeholder page)
                  </li>
                  <li>
                    <strong>placeholder.html</strong> or similar
                  </li>
                  <li>
                    Any <strong>IONOS branding files</strong>
                  </li>
                  <li>
                    <strong>Default images</strong> or logos
                  </li>
                  <li>
                    Any <strong>sample content</strong>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">✅ How to Delete:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>In IONOS File Manager, select all files in your domain folder</li>
                  <li>
                    Right-click and choose <strong>"Delete"</strong>
                  </li>
                  <li>Confirm the deletion</li>
                  <li>Ensure the folder is completely empty</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Upload Your Files */}
        <Card className="border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <Upload className="h-5 w-5 text-green-600" />
              Upload AlphaAIStockX Files
            </CardTitle>
            <CardDescription>Deploy your revolutionary AI trading platform</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">📤 Upload Process:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Open your local 'out' folder</strong>
                    <div className="text-gray-600 ml-4">This was created in Step 1</div>
                  </li>
                  <li>
                    <strong>Select ALL files and folders</strong>
                    <div className="text-gray-600 ml-4">Use Ctrl+A (Windows) or Cmd+A (Mac)</div>
                  </li>
                  <li>
                    <strong>Drag and drop to IONOS File Manager</strong>
                    <div className="text-gray-600 ml-4">Or use the "Upload" button</div>
                  </li>
                  <li>
                    <strong>Wait for upload to complete</strong>
                    <div className="text-gray-600 ml-4">This may take 10-30 minutes</div>
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">📁 Key Files to Verify:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <strong>index.html</strong> (homepage)
                    </li>
                    <li>
                      <strong>404.html</strong> (error page)
                    </li>
                    <li>
                      <strong>_next/</strong> folder (assets)
                    </li>
                    <li>
                      <strong>sitemap.xml</strong> (SEO)
                    </li>
                    <li>
                      <strong>robots.txt</strong> (search)
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">⏱️ Upload Progress:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      Small files: <strong>1-2 minutes</strong>
                    </li>
                    <li>
                      Images: <strong>5-10 minutes</strong>
                    </li>
                    <li>
                      JavaScript: <strong>10-15 minutes</strong>
                    </li>
                    <li>
                      Total time: <strong>15-30 minutes</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="border-yellow-500 bg-yellow-50">
                <Clock className="h-5 w-5 text-yellow-500" />
                <AlertDescription className="text-yellow-600">
                  <strong>Be Patient:</strong> Large applications like AlphaAIStockX take time to upload. Don't close
                  the browser during upload!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Step 6: Configure SSL */}
        <Card className="border-indigo-500">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <Lock className="h-5 w-5 text-indigo-600" />
              Enable SSL Security
            </CardTitle>
            <CardDescription>Critical for financial platforms - enable HTTPS</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Alert className="border-red-500 bg-red-50">
                <Lock className="h-5 w-5 text-red-500" />
                <AlertTitle className="text-red-700">🔒 SSL Required</AlertTitle>
                <AlertDescription className="text-red-600">
                  This step is MANDATORY for AlphaAIStockX - financial platforms must use HTTPS!
                </AlertDescription>
              </Alert>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">🔐 SSL Activation Steps:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    <strong>In IONOS Control Panel:</strong>
                    <div className="text-gray-600 ml-4">Navigate to "Domains & SSL"</div>
                  </li>
                  <li>
                    <strong>Click "SSL Certificates"</strong>
                    <div className="text-gray-600 ml-4">Find alphaaistockx.com in the list</div>
                  </li>
                  <li>
                    <strong>Click "Activate Free SSL"</strong>
                    <div className="text-gray-600 ml-4">Choose "DV Certificate" (Domain Validation)</div>
                  </li>
                  <li>
                    <strong>Complete the order</strong>
                    <div className="text-gray-600 ml-4">It's free with your hosting plan</div>
                  </li>
                  <li>
                    <strong>Wait for activation</strong>
                    <div className="text-gray-600 ml-4">Usually 5-15 minutes</div>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ SSL Success Indicators:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-green-700">
                  <li>Certificate status shows "Active" in IONOS panel</li>
                  <li>https://alphaaistockx.com loads without warnings</li>
                  <li>Browser shows padlock icon 🔒</li>
                  <li>No "insecure connection" messages</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 7: Test Your Website */}
        <Card className="border-emerald-500">
          <CardHeader className="bg-emerald-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                7
              </div>
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              Test Your Live Website
            </CardTitle>
            <CardDescription>Verify everything works perfectly</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">🧪 Testing Checklist:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-emerald-700 mb-2">Basic Functionality:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Homepage loads correctly</li>
                      <li>Navigation works</li>
                      <li>Images display properly</li>
                      <li>Styles are applied</li>
                      <li>JavaScript functions work</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-emerald-700 mb-2">AI Features:</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Investor Profile loads</li>
                      <li>AI features display</li>
                      <li>Trading components work</li>
                      <li>Compliance info shows</li>
                      <li>Mobile responsive</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🌐 URLs to Test:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>https://alphaaistockx.com</strong> <span className="text-gray-500">← Main homepage</span>
                  </div>
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>https://www.alphaaistockx.com</strong>{" "}
                    <span className="text-gray-500">← Should redirect</span>
                  </div>
                  <div className="bg-white p-2 rounded border font-mono">
                    <strong>http://alphaaistockx.com</strong>{" "}
                    <span className="text-gray-500">← Should redirect to HTTPS</span>
                  </div>
                </div>
              </div>

              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <AlertDescription className="text-green-600">
                  <strong>Success!</strong> If all tests pass, your AlphaAIStockX platform is live and ready to dominate
                  the stock market! 🚀
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Final Success Card */}
        <Card className="border-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎉 CONGRATULATIONS!
            </CardTitle>
            <CardDescription className="text-center text-lg">
              AlphaAIStockX is now LIVE at alphaaistockx.com
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">✅</div>
                  <div className="text-sm font-medium">Domain Active</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">🔒</div>
                  <div className="text-sm font-medium">SSL Secured</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">🚀</div>
                  <div className="text-sm font-medium">Platform Live</div>
                </div>
              </div>
              <p className="text-gray-600">
                Your revolutionary AI trading platform is now ready to change the world of stock trading!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
