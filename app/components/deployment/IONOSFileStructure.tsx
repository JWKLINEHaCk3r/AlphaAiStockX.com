import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FolderOpen, File, Info } from "lucide-react"

export default function IONOSFileStructure() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">📁 File Structure for IONOS Upload</h1>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertDescription className="text-blue-600">
          After running <code className="bg-white px-2 py-1 rounded">npm run build</code>, upload ALL contents from the{" "}
          <strong>out/</strong> folder to your IONOS web root directory.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-blue-500" />
              Your Build Output Structure
            </CardTitle>
            <CardDescription>Contents of the 'out' folder after build</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">index.html</span>
                  <span className="text-gray-400">← Main homepage</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-green-400" />
                  <span className="text-green-400">404.html</span>
                  <span className="text-gray-400">← Error page</span>
                </div>
                <div className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400">_next/</span>
                  <span className="text-gray-400">← Next.js assets</span>
                </div>
                <div className="pl-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400">static/</span>
                    <span className="text-gray-400">← CSS, JS files</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400">sitemap.xml</span>
                  <span className="text-gray-400">← SEO sitemap</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400">robots.txt</span>
                  <span className="text-gray-400">← Search engine rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-400">favicon.ico</span>
                  <span className="text-gray-400">← Site icon</span>
                </div>
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-400">site.webmanifest</span>
                  <span className="text-gray-400">← PWA manifest</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🎯 IONOS Upload Instructions</CardTitle>
            <CardDescription>Exact steps to upload your files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📂 IONOS File Manager Path:</h4>
                <div className="bg-white p-2 rounded border font-mono text-sm">
                  /alphaaistockx.com/ <span className="text-gray-500">← Your web root directory</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">✅ Upload Process:</h4>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>
                    <strong>Delete existing files</strong> in /alphaaistockx.com/ directory
                  </li>
                  <li>
                    <strong>Select all files</strong> from your local 'out' folder
                  </li>
                  <li>
                    <strong>Drag and drop</strong> or use "Upload" button in IONOS File Manager
                  </li>
                  <li>
                    <strong>Wait for upload</strong> to complete (may take 10-30 minutes)
                  </li>
                  <li>
                    <strong>Verify</strong> that index.html is in the root directory
                  </li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notes:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    Upload <strong>ALL files and folders</strong> from the 'out' directory
                  </li>
                  <li>
                    Maintain the <strong>exact folder structure</strong>
                  </li>
                  <li>Don't upload the 'out' folder itself, just its contents</li>
                  <li>
                    The <strong>index.html</strong> file must be in the root directory
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="text-green-700">🚀 After Upload Verification</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <strong>Test your homepage:</strong> Visit https://alphaaistockx.com
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <strong>Check SSL security:</strong> Look for the padlock icon 🔒
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <strong>Test navigation:</strong> Click through different sections
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <strong>Verify mobile:</strong> Test on mobile devices
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
