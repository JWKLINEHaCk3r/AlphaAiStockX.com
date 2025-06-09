import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function IONOSDeploymentChecklist() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AlphaAIStockX Deployment Checklist</h1>

      <p className="text-lg mb-6">
        Use this comprehensive checklist to ensure your AlphaAIStockX platform is properly deployed and configured on
        IONOS.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pre-Deployment</CardTitle>
            <CardDescription>Tasks to complete before uploading files</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Build Next.js application with static export</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Test the build locally to ensure all features work</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Optimize images and assets for web</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Create .htaccess file with necessary redirects and optimizations</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Prepare robots.txt and sitemap.xml files</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IONOS Account Setup</CardTitle>
            <CardDescription>Preparing your hosting environment</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Create IONOS account or log in to existing account</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Select appropriate hosting plan (recommend Business or Expert)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Register domain name or configure existing domain</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set up FTP account for file uploads</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Deployment</CardTitle>
            <CardDescription>Uploading your application files</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Connect to IONOS server via FTP</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Navigate to web root directory (htdocs or public_html)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Upload all files from Next.js out directory</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Upload .htaccess, robots.txt, and sitemap.xml files</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set proper file permissions (typically 644 for files, 755 for directories)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Domain and SSL Configuration</CardTitle>
            <CardDescription>Setting up secure access to your site</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Configure DNS settings for your domain</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set up www to non-www redirection (or vice versa)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Activate SSL certificate</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Configure HTTPS redirection in .htaccess</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set up any required subdomains</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Post-Deployment Testing</CardTitle>
            <CardDescription>Verifying your site works correctly</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Verify site loads correctly at your domain</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Test all pages and navigation</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Confirm SSL is working (padlock icon in browser)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Test site on mobile devices</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Check page load speed (using tools like Google PageSpeed)</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Verify all images and assets load properly</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Test all interactive features (forms, buttons, etc.)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Final Steps</CardTitle>
            <CardDescription>Completing your deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Submit sitemap to Google Search Console</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set up Google Analytics or other tracking tools</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Configure backup schedule in IONOS Control Panel</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Document deployment process for future updates</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <span>Set up monitoring for website uptime</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
