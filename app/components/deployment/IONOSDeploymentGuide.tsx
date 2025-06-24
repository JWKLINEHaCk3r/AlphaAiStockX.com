const IONOSDeploymentGuide = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">IONOS Deployment Guide</h2>
      <p className="text-lg mb-6 text-gray-600">
        Follow these steps to deploy your application on IONOS:
      </p>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Prerequisites</h3>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>An IONOS account</li>
        <li>Node.js and npm installed</li>
        <li>A domain name pointed to your IONOS server</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Deployment Steps</h3>
      <ol className="list-decimal list-inside space-y-6">
        <li>
          <strong>Clone your repository:</strong>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>git clone your_repository_url</code>
          </pre>
        </li>
        <li>
          <strong>Navigate to your project directory:</strong>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>cd your_project_directory</code>
          </pre>
        </li>
        <li>
          <strong>Install dependencies:</strong>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>npm install</code>
          </pre>
        </li>
        <li>
          <strong>Build your application:</strong>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>npm run build</code>
          </pre>
        </li>
        <li>
          <strong>Configure your server:</strong>
          <p className="mt-2">
            Configure your IONOS server to serve the built application files (usually in the{' '}
            <code className="bg-gray-100 px-1 rounded">/dist</code> or{' '}
            <code className="bg-gray-100 px-1 rounded">/build</code> directory). You may need to
            configure a reverse proxy (e.g., using Nginx or Apache) to route requests to your
            application.
          </p>
        </li>
        <li>
          <strong>Start your application:</strong>
          <p className="mt-2">
            Start your application using a process manager like PM2 or systemd to ensure it stays
            running. For example, if you have a{' '}
            <code className="bg-gray-100 px-1 rounded">start</code> script in your{' '}
            <code className="bg-gray-100 px-1 rounded">package.json</code>:
          </p>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>npm start</code>
          </pre>
        </li>
        <li>
          <strong>Set up a reverse proxy (Example with Nginx):</strong>
          <p className="mt-2">
            Create an Nginx configuration file (e.g.,{' '}
            <code className="bg-gray-100 px-1 rounded">/etc/nginx/sites-available/your-app</code>)
            with the following content:
          </p>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>
              {`server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`}
            </code>
          </pre>
          <p className="mt-2">Then, create a symbolic link to enable the configuration:</p>
          <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
            <code>
              {`sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx`}
            </code>
          </pre>
        </li>
      </ol>

      <h3 className="text-2xl font-semibold mb-4 mt-8 text-gray-700">Troubleshooting</h3>
      <p className="text-gray-600">
        If you encounter any issues, check your server logs, Nginx configuration, and application
        logs for errors.
      </p>

      <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Tips:</h4>
        <ul className="list-disc list-inside space-y-1 text-blue-700">
          <li>Always test your configuration locally before deploying</li>
          <li>Use PM2 for production process management</li>
          <li>Set up SSL certificates for HTTPS</li>
          <li>Monitor your application logs regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default IONOSDeploymentGuide;
