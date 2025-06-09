import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle, AlertTriangle, Info } from "lucide-react"

export default function IONOSDeploymentGuide() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">AlphaAIStockX Deployment Guide for IONOS</h1>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">Important</AlertTitle>
        <AlertDescription className="text-blue-600">
          This guide assumes you've already built your Next.js application with the static export option.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                1
              </span>
              Create an IONOS Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Go to{" "}
                <a href="https://www.ionos.com" className="text-blue-600 hover:underline">
                  IONOS.com
                </a>{" "}
                and click "Sign In" in the top right corner
              </li>
              <li>If you don't have an account, click "Create Account" and follow the registration process</li>
              <li>Choose a hosting plan that suits your needs (Web Hosting is recommended for static sites)</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                2
              </span>
              Build Your Next.js Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Run the build command to generate the static export:</p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm mb-4">npm run build</div>
            <p>
              This will create an <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory with all static
              files.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                3
              </span>
              Access IONOS File Manager
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your IONOS Control Panel</li>
              <li>Navigate to "Hosting" → "Your Hosting Package"</li>
              <li>Click on "File Manager" or "WebFTP"</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                4
              </span>
              Upload Your Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                In the File Manager, navigate to the public directory (usually{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">htdocs</code> or{" "}
                <code className="bg-gray-100 px-1 py-0.5 rounded">public_html</code>)
              </li>
              <li>
                Upload all files from your local <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory
                to this folder
              </li>
              <li>
                You can either:
                <ul className="list-disc pl-5 mt-2">
                  <li>Upload files individually</li>
                  <li>
                    Zip your <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory, upload the zip, and
                    extract it on the server
                  </li>
                  <li>Use FTP client like FileZilla for bulk uploads (recommended)</li>
                </ul>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                5
              </span>
              Configure Domain Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>In the IONOS Control Panel, go to "Domains & SSL"</li>
              <li>Select your domain or register a new one</li>
              <li>Point the domain to your hosting package</li>
              <li>Configure DNS settings if needed</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                6
              </span>
              Set Up SSL Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>In the IONOS Control Panel, go to "Domains & SSL" → "SSL Certificates"</li>
              <li>Select your domain and activate the SSL certificate</li>
              <li>Follow the instructions to complete the SSL setup</li>
            </ol>
            <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3 rounded-md border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <p className="text-amber-700 text-sm">
                SSL is crucial for secure connections and SEO ranking. Don't skip this step!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                7
              </span>
              Configure Custom Headers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Create an <code className="bg-gray-100 px-1 py-0.5 rounded">.htaccess</code> file in your root directory
              with the following content:
            </p>
            <div className="bg-gray-900 text-gray-100 p-3 rounded-md font-mono text-sm mb-4 whitespace-pre-wrap">
              {`# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>

# Set caching headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# Security headers
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "origin-when-cross-origin"

# Handle 404 errors
ErrorDocument 404 /404.html`}
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Verify Your Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Visit your domain to ensure the website loads correctly</li>
              <li>Test all major features and functionality</li>
              <li>Check that all assets (images, CSS, JavaScript) load properly</li>
              <li>Verify that your SSL certificate is working (URL should show https://)</li>
            </ol>
          </CardContent>
          <CardFooter className="bg-green-50">
            <p className="text-green-700 text-sm">
              Congratulations! Your AlphaAIStockX platform should now be live on IONOS hosting!
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
