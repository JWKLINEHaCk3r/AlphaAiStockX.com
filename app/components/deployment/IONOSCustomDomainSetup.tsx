import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info, AlertTriangle } from "lucide-react"

export default function IONOSCustomDomainSetup() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Setting Up Your Custom Domain on IONOS</h1>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">Professional Branding</AlertTitle>
        <AlertDescription className="text-blue-600">
          A custom domain like alphaaistockx.com enhances your platform's credibility and brand recognition.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Option 1: Register a New Domain with IONOS</CardTitle>
            <CardDescription>Purchase and configure a new domain directly through IONOS</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your IONOS Control Panel</li>
              <li>Go to "Domains & SSL" → "Register a new domain"</li>
              <li>Search for your desired domain name (e.g., alphaaistockx.com)</li>
              <li>Select the available domain and add it to your cart</li>
              <li>Complete the checkout process</li>
              <li>Once registered, IONOS will automatically configure the DNS settings</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Option 2: Transfer an Existing Domain to IONOS</CardTitle>
            <CardDescription>Move your domain from another registrar to IONOS</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Unlock your domain at your current registrar</li>
              <li>Obtain the authorization/EPP code from your current registrar</li>
              <li>In IONOS Control Panel, go to "Domains & SSL" → "Transfer domains"</li>
              <li>Enter your domain name and follow the transfer instructions</li>
              <li>Provide the authorization code when prompted</li>
              <li>Complete the transfer process (may take 5-7 days)</li>
            </ol>
            <div className="mt-4 flex items-start gap-2 bg-amber-50 p-3 rounded-md border border-amber-200">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <p className="text-amber-700 text-sm">
                Domain transfers can take several days to complete. Plan accordingly to avoid downtime.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Option 3: Use an External Domain with IONOS Hosting</CardTitle>
            <CardDescription>Keep your domain at another registrar but use IONOS hosting</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your domain registrar's control panel</li>
              <li>Find the DNS management or nameserver settings</li>
              <li>
                Update the nameservers to IONOS nameservers:
                <ul className="list-disc pl-5 mt-2">
                  <li>ns1.ionos.com</li>
                  <li>ns2.ionos.com</li>
                </ul>
              </li>
              <li>In your IONOS Control Panel, go to "Domains & SSL" → "External domains"</li>
              <li>Add your external domain and link it to your hosting package</li>
              <li>Wait for DNS propagation (24-48 hours)</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuring DNS Records</CardTitle>
            <CardDescription>Set up proper DNS records for your domain</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              After your domain is registered or transferred, configure these essential DNS records:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 border-b text-left">Record Type</th>
                    <th className="py-2 px-4 border-b text-left">Name/Host</th>
                    <th className="py-2 px-4 border-b text-left">Value/Target</th>
                    <th className="py-2 px-4 border-b text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-b">A</td>
                    <td className="py-2 px-4 border-b">@</td>
                    <td className="py-2 px-4 border-b">[Your IONOS Server IP]</td>
                    <td className="py-2 px-4 border-b">Points domain root to your server</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">CNAME</td>
                    <td className="py-2 px-4 border-b">www</td>
                    <td className="py-2 px-4 border-b">@</td>
                    <td className="py-2 px-4 border-b">Redirects www to your domain root</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">MX</td>
                    <td className="py-2 px-4 border-b">@</td>
                    <td className="py-2 px-4 border-b">mx00.ionos.com</td>
                    <td className="py-2 px-4 border-b">Email delivery (if using IONOS email)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-b">TXT</td>
                    <td className="py-2 px-4 border-b">@</td>
                    <td className="py-2 px-4 border-b">v=spf1 include:spf.ionos.com ~all</td>
                    <td className="py-2 px-4 border-b">Email authentication (SPF)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> IONOS often configures these records automatically when you register a domain
                through them. You may only need to adjust them for specific requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Setting Up Subdomains (Optional)</CardTitle>
            <CardDescription>Create specialized sections of your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You might want to set up subdomains for different parts of your AlphaAIStockX platform:
            </p>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>app.alphaaistockx.com</strong> - For the main trading application
              </li>
              <li>
                <strong>api.alphaaistockx.com</strong> - For API endpoints
              </li>
              <li>
                <strong>blog.alphaaistockx.com</strong> - For market insights and articles
              </li>
              <li>
                <strong>admin.alphaaistockx.com</strong> - For administrative access
              </li>
            </ul>

            <p className="mt-4 mb-2">To set up a subdomain:</p>

            <ol className="list-decimal pl-5 space-y-2">
              <li>In IONOS Control Panel, go to "Domains & SSL" → "Subdomains"</li>
              <li>Click "Create Subdomain"</li>
              <li>Enter your desired subdomain name</li>
              <li>Select the target directory for the subdomain</li>
              <li>Save the changes</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
