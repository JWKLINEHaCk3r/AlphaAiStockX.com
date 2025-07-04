'use client';

import { ntent, CardHeader, CardTitle } from '@/components/ui/card';
import { Card } from '@/components/ui/button';
import { Card } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Globe, Server, Clock, ExternalLink } from 'lucide-react';

export default function IONOSDNSSetup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-6 w-6" />
              URGENT: DNS CONFIGURATION REQUIRED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-red-600 space-y-2">
              <p>
                <strong>Issue:</strong> alphaaistockx.com is not pointing to IONOS hosting
              </p>
              <p>
                <strong>Impact:</strong> Website cannot be accessed by visitors
              </p>
              <p>
                <strong>Time to Fix:</strong> 5 minutes setup + 24-48 hours propagation
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Server className="h-6 w-6" />
                STEP 1: DOMAIN REGISTRAR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Find Your Registrar:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Check your email for domain purchase receipt</li>
                  <li>• Common registrars: GoDaddy, Namecheap, Google Domains</li>
                  <li>• Use WHOIS lookup if unsure</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Login & Navigate:</h4>
                <ul className="space-y-1 text-sm">
                  <li>1. Login to your registrar account</li>
                  <li>2. Find "DNS Management" or "Nameservers"</li>
                  <li>3. Look for alphaaistockx.com domain</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Globe className="h-6 w-6" />
                STEP 2: UPDATE NAMESERVERS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">IONOS Nameservers:</h4>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded border">
                    <code className="text-lg">ns1.ionos.com</code>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <code className="text-lg">ns2.ionos.com</code>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">How to Update:</h4>
                <ul className="space-y-1 text-sm">
                  <li>1. Replace existing nameservers</li>
                  <li>2. Enter both IONOS nameservers</li>
                  <li>3. Save changes</li>
                  <li>4. Wait for confirmation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <CheckCircle className="h-6 w-6" />
              STEP 3: VERIFY IONOS CONFIGURATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">IONOS Control Panel:</h4>
                <ul className="space-y-1 text-sm">
                  <li>1. Login to IONOS Control Panel</li>
                  <li>2. Go to Hosting → Domains</li>
                  <li>3. Verify alphaaistockx.com is listed</li>
                  <li>4. Check domain status is "Active"</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">File Upload Check:</h4>
                <ul className="space-y-1 text-sm">
                  <li>1. Go to File Manager</li>
                  <li>2. Navigate to domain root folder</li>
                  <li>3. Ensure index.html is present</li>
                  <li>4. Verify .htaccess file exists</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Clock className="h-6 w-6" />
              STEP 4: WAIT FOR PROPAGATION
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Timeline:</h4>
                <ul className="space-y-1">
                  <li>
                    • <strong>0-2 hours:</strong> Changes begin to propagate
                  </li>
                  <li>
                    • <strong>2-24 hours:</strong> Most locations updated
                  </li>
                  <li>
                    • <strong>24-48 hours:</strong> Global propagation complete
                  </li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Button asChild className="h-auto p-4">
                  <a
                    href="https://www.whatsmydns.net/#A/alphaaistockx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Check DNS Propagation
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-auto p-4">
                  <a
                    href="https://dnschecker.org/#A/alphaaistockx.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Global DNS Checker
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-6 w-6" />
              NEED IMMEDIATE HELP?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">IONOS Technical Support:</h4>
                <div className="text-lg font-mono bg-gray-100 p-2 rounded">📞 1-484-254-5555</div>
                <p className="text-sm text-gray-600 mt-2">
                  Available 24/7 for DNS configuration help
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">What to Tell Support:</h4>
                <p className="text-sm bg-gray-50 p-3 rounded italic">
                  "My domain alphaaistockx.com is not resolving to my IONOS hosting package. I need
                  help configuring DNS and verifying my nameservers are set correctly."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
