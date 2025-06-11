const IONOSFTPGuide = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">IONOS FTP Deployment Guide</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
        <ul className="list-disc list-inside">
          <li>An IONOS account with a domain and webspace package.</li>
          <li>An FTP client (e.g., FileZilla).</li>
          <li>Node.js and npm installed locally.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Deployment Steps</h2>
        <ol className="list-decimal list-inside">
          <li>
            <p className="mb-2">
              <strong>Step 1: Build your application.</strong>
            </p>
            <p className="mb-2">Run the following command in your project directory to build your application:</p>
            <pre className="bg-gray-100 p-2 rounded">
              <code>npm run build</code>
            </pre>
            <p className="mb-2">
              This will create a <code>dist</code> or <code>build</code> folder (depending on your project setup)
              containing the production-ready files.
            </p>
          </li>
          <li>
            <p className="mb-2">
              <strong>Step 2: Install dependencies.</strong>
            </p>
            <p className="mb-2">Run the following command in your project directory to install dependencies:</p>
            <pre className="bg-gray-100 p-2 rounded">
              <code>npm install</code>
            </pre>
          </li>
          <li>
            <p className="mb-2">
              <strong>Step 3: Connect to your IONOS webspace via FTP.</strong>
            </p>
            <p className="mb-2">Open your FTP client and enter the following details:</p>
            <ul className="list-disc list-inside">
              <li>
                <strong>Host:</strong> Your IONOS FTP server address (usually your domain name or a specific FTP server
                address provided by IONOS).
              </li>
              <li>
                <strong>Username:</strong> Your IONOS FTP username.
              </li>
              <li>
                <strong>Password:</strong> Your IONOS FTP password.
              </li>
              <li>
                <strong>Port:</strong> 21 (usually).
              </li>
            </ul>
            <p className="mb-2">Click "Connect" to establish the FTP connection.</p>
          </li>
          <li>
            <p className="mb-2">
              <strong>Step 4: Upload your application files.</strong>
            </p>
            <p className="mb-2">
              Navigate to the root directory of your webspace (usually <code>/</code> or <code>/htdocs</code>).
            </p>
            <p className="mb-2">
              Upload the contents of your <code>dist</code> or <code>build</code> folder to this directory. Make sure to
              upload the *contents* of the folder, not the folder itself.
            </p>
          </li>
          <li>
            <p className="mb-2">
              <strong>Step 5: Verify your deployment.</strong>
            </p>
            <p className="mb-2">
              Open your website in a web browser to verify that your application is deployed correctly.
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Troubleshooting</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>"Website not found" error:</strong> Double-check that you have uploaded the files to the correct
            directory and that your domain is correctly configured to point to your webspace.
          </li>
          <li>
            <strong>"Internal Server Error":</strong> Check your server logs for more information about the error. This
            could be due to incorrect file permissions or missing dependencies.
          </li>
        </ul>
      </section>
    </div>
  )
}

export default IONOSFTPGuide
