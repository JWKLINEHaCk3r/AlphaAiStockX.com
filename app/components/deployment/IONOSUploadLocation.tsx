import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../../../components/ui/card';
import Navigation from 'components/ui/navigation/index.tsx';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '../../../components/ui/card';
import { AlertTitle } from "../../../components/ui/alert";
import { AlertDescription } from "../../../components/ui/alert";
import { Alert } from "../../../components/ui/alert";
import { Badge } from "../../../components/ui/badge";
import { Select } from "../../../components/ui/select";
import { CardTitle } from "../../../components/ui/card";
import { CardHeader } from "../../../components/ui/card";
import { CardDescription } from "../../../components/ui/card";
import { CardContent } from "../../../components/ui/card";
import { Card } from "../../../components/ui/card";
import React from 'react';
import { FolderOpen, Upload, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function IONOSUploadLocation() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📂 IONOS Upload Location Guide
        </h1>
        <p className="text-xl text-gray-600">
          Exact steps to find where to upload your AlphaAIStockX files
        </p>
        <Badge variant="outline" className="mt-2">
          Domain: alphaaistockx.com
        </Badge>
      </div>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">🎯 Quick Answer</AlertTitle>
        <AlertDescription className="text-blue-600">
          Upload to: <strong>/alphaaistockx.com/</strong> folder in IONOS File Manager
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* Step 1: Access IONOS */}
        <Card className="border-blue-500">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              🌐 Access IONOS Control Panel
            </CardTitle>
            <CardDescription>Log in to your IONOS account</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">🔗 Login Steps:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>
                    Go to <strong>ionos.com</strong>
                  </li>
                  <li>
                    Click <strong>"Sign In"</strong> (top right corner)
                  </li>
                  <li>Enter your IONOS email and password</li>
                  <li>
                    Click <strong>"Login"</strong>
                  </li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Navigate to Hosting */}
        <Card className="border-purple-500">
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              🏠 Find Your Hosting Section
            </CardTitle>
            <CardDescription>Navigate to your website hosting area</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">📍 Navigation Path:</h4>
                <div className="flex items-center gap-2 text-sm bg-white p-3 rounded border">
                  <span className="bg-purple-100 px-2 py-1 rounded">Control Panel</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="bg-purple-100 px-2 py-1 rounded">Hosting</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="bg-purple-100 px-2 py-1 rounded">Your Package</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Look For:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <strong>"Hosting"</strong> in main menu
                    </li>
                    <li>
                      <strong>"Web Hosting"</strong> section
                    </li>
                    <li>
                      <strong>"My Contracts"</strong> area
                    </li>
                    <li>Your hosting package name</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Alternative Names:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>
                      <strong>"Websites"</strong>
                    </li>
                    <li>
                      <strong>"Domains"</strong>
                    </li>
                    <li>
                      <strong>"My Products"</strong>
                    </li>
                    <li>
                      <strong>"Services"</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Find File Manager */}
        <Card className="border-orange-500">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              📁 Access File Manager
            </CardTitle>
            <CardDescription>Find the file management tool</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">🔍 File Manager Options:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-orange-700 mb-2">Option 1: File Manager</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        Look for <strong>"File Manager"</strong> button
                      </li>
                      <li>Usually in hosting dashboard</li>
                      <li>Web-based file browser</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-orange-700 mb-2">Option 2: FTP Access</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>
                        Look for <strong>"FTP"</strong> or <strong>"WebFTP"</strong>
                      </li>
                      <li>More advanced option</li>
                      <li>Better for large uploads</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Alert className="border-blue-500 bg-blue-50">
                <Info className="h-5 w-5 text-blue-500" />
                <AlertDescription className="text-blue-600">
                  <strong>Can't find File Manager?</strong> Look for "Website Builder", "Content
                  Management", or contact IONOS support.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Navigate to Domain Folder */}
        <Card className="border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              🎯 Find alphaaistockx.com Folder
            </CardTitle>
            <CardDescription>Locate your domain's upload directory</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">📂 Directory Structure:</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400">/</span>
                      <span className="text-gray-400">← Root directory</span>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400">alphaaistockx.com/</span>
                        <span className="text-green-400">← UPLOAD HERE! ✅</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">logs/</span>
                        <span className="text-gray-500">← Server logs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-400">tmp/</span>
                        <span className="text-gray-500">← Temporary files</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">✅ Correct Location:</h4>
                  <div className="bg-white p-2 rounded border font-mono text-sm">
                    <strong>/alphaaistockx.com/</strong>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">This is your web root directory</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Wrong Locations:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    <li>
                      <code>/logs/</code>
                    </li>
                    <li>
                      <code>/tmp/</code>
                    </li>
                    <li>
                      <code>/mail/</code>
                    </li>
                    <li>
                      Root directory <code>/</code>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert className="border-yellow-500 bg-yellow-50">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <AlertDescription className="text-yellow-600">
                  <strong>Alternative Paths:</strong> Some IONOS setups use{' '}
                  <code>/htdocs/alphaaistockx.com/</code> or <code>/public_html/</code>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Upload Process */}
        <Card className="border-indigo-500">
          <CardHeader className="bg-indigo-50">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <Upload className="h-5 w-5 text-indigo-600" />
              Upload Your Files
            </CardTitle>
            <CardDescription>Deploy AlphaAIStockX to the correct location</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">📤 Upload Steps:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Double-click</strong> the <code>alphaaistockx.com</code> folder to open
                    it
                  </li>
                  <li>
                    <strong>Delete any existing files</strong> (IONOS placeholder content)
                  </li>
                  <li>
                    <strong>Open your local 'out' folder</strong> (from npm run build)
                  </li>
                  <li>
                    <strong>Select ALL files and folders</strong> inside the 'out' folder
                  </li>
                  <li>
                    <strong>Drag and drop</strong> into the IONOS File Manager
                  </li>
                  <li>
                    <strong>Wait for upload</strong> to complete (15-30 minutes)
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  ✅ What You Should See After Upload:
                </h4>
                <div className="bg-white p-3 rounded border font-mono text-sm">
                  <div className="space-y-1">
                    <div>📄 index.html</div>
                    <div>📄 404.html</div>
                    <div>📁 _next/</div>
                    <div>📄 sitemap.xml</div>
                    <div>📄 robots.txt</div>
                    <div>📄 favicon.ico</div>
                    <div>📄 site.webmanifest</div>
                  </div>
                </div>
              </div>

              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <AlertDescription className="text-green-600">
                  <strong>Success!</strong> Once uploaded, visit https://alphaaistockx.com to see
                  your live platform!
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Visual Summary */}
        <Card className="border-gradient-to-r from-blue-500 to-purple-500 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-center text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              📍 UPLOAD LOCATION SUMMARY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">📂</div>
                <div className="text-lg font-semibold">/alphaaistockx.com/</div>
                <div className="text-sm text-gray-600">Your web root directory</div>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="bg-white px-3 py-2 rounded border">IONOS Control Panel</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-white px-3 py-2 rounded border">Hosting</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-white px-3 py-2 rounded border">File Manager</div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="bg-blue-100 px-3 py-2 rounded border border-blue-300 font-semibold">
                  alphaaistockx.com/
                </div>
              </div>

              <p className="text-gray-600">
                Upload ALL contents from your 'out' folder to this directory!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
