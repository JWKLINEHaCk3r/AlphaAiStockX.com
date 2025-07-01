import type React from 'react';

interface ChecklistItem {
  label: string;
  completed: boolean;
}

interface IONOSDeploymentChecklistProps {
  items: ChecklistItem[];
}

const IONOSDeploymentChecklist: React.FC<IONOSDeploymentChecklistProps> = ({ items }) => {
  return (
    <div>
      <h2>Deployment Checklist</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input type="checkbox" checked={item.completed} readOnly />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <div>
        <h3>Deployment Steps:</h3>
        <ol>
          <li>
            Install dependencies: <code>npm install</code>
          </li>
          <li>
            Build the application: <code>npm run build</code>
          </li>
          <li>Deploy the application to your IONOS server.</li>
          <li>Verify the deployment.</li>
        </ol>
      </div>
    </div>
  );
};

export default IONOSDeploymentChecklist;
