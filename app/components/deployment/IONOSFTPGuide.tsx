import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function IONOSFTPGuide() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Using FileZilla with IONOS</h1>

      <Alert className="mb-6 border-blue-500 bg-blue-50">
        <Info className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-700">FTP Recommended</AlertTitle>
        <AlertDescription className="text-blue-600">
          For large applications like AlphaAIStockX, using an FTP client is much more efficient than the web interface.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 1: Get Your FTP Credentials</CardTitle>
          <CardDescription>Find your FTP login details from IONOS Control Panel</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Log in to your IONOS Control Panel</li>
            <li>Go to "Hosting" → select your hosting package</li>
            <li>Look for "FTP Access" or "FTP Accounts"</li>
            <li>
              Note down the following information:
              <ul className="list-disc pl-5 mt-2">
                <li>FTP Server/Host: Usually ftp.yourdomain.com</li>
                <li>Username: Your FTP username</li>
                <li>Password: Your FTP password</li>
                <li>Port: Usually 21 (standard FTP port)</li>
              </ul>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 2: Download and Install FileZilla</CardTitle>
          <CardDescription>FileZilla is a free, open-source FTP client</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Go to{" "}
              <a href="https://filezilla-project.org/" className="text-blue-600 hover:underline">
                https://filezilla-project.org/
              </a>
            </li>
            <li>Download the appropriate version for your operating system</li>
            <li>Install FileZilla following the installation wizard</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 3: Connect to IONOS via FileZilla</CardTitle>
          <CardDescription>Establish a connection to your hosting account</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Open FileZilla</li>
            <li>
              Enter your FTP credentials in the quickconnect bar at the top:
              <ul className="list-disc pl-5 mt-2">
                <li>Host: Your FTP server address</li>
                <li>Username: Your FTP username</li>
                <li>Password: Your FTP password</li>
                <li>Port: 21 (or as specified by IONOS)</li>
              </ul>
            </li>
            <li>Click "Quickconnect" to establish the connection</li>
          </ol>
          <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> For a more secure connection, you can use FTPS (FTP over SSL/TLS) if supported by
              IONOS. In FileZilla, go to File → Site Manager → New Site, then set "Encryption" to "Require explicit FTP
              over TLS".
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 4: Navigate to the Web Root Directory</CardTitle>
          <CardDescription>Find the correct folder to upload your files</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            After connecting, the right panel shows your remote server files. Navigate to the web root directory:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Common web root directories on IONOS:
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">htdocs</code>
                </li>
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">public_html</code>
                </li>
                <li>
                  <code className="bg-gray-100 px-1 py-0.5 rounded">www</code>
                </li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step 5: Upload Your Next.js Build Files</CardTitle>
          <CardDescription>Transfer your static export files to the server</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              In the left panel (local files), navigate to your Next.js project's{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory
            </li>
            <li>
              Select all files and folders in the <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory
            </li>
            <li>Right-click and select "Upload" or drag the files to the right panel</li>
            <li>Wait for the upload to complete (this may take several minutes for large applications)</li>
          </ol>
          <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200">
            <p className="text-sm text-amber-700">
              <strong>Important:</strong> Make sure to upload the contents of the{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">out</code> directory, not the directory itself. Your
              index.html file should be directly in the web root.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Step 6: Verify Your Upload</CardTitle>
          <CardDescription>Ensure all files transferred correctly</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Check that all files and folders have been uploaded successfully</li>
            <li>Visit your website URL to confirm everything is working</li>
            <li>Test navigation between pages and functionality</li>
          </ol>
          <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-200">
            <p className="text-sm text-green-700">
              <strong>Success:</strong> If you see your AlphaAIStockX platform loading correctly, congratulations! Your
              deployment to IONOS is complete.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
