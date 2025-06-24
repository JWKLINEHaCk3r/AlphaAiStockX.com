import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ErrorChecker from './ErrorChecker';
import BuildValidator from './BuildValidator';
import DeploymentChecklist from './DeploymentChecklist';

export default function DiagnosticsDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🔍 AlphaAIStockX Diagnostics Center
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive error checking and deployment validation
        </p>
      </div>

      <Tabs defaultValue="errors" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="errors">Error Checker</TabsTrigger>
          <TabsTrigger value="build">Build Validator</TabsTrigger>
          <TabsTrigger value="checklist">Deployment Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="errors">
          <ErrorChecker />
        </TabsContent>

        <TabsContent value="build">
          <BuildValidator />
        </TabsContent>

        <TabsContent value="checklist">
          <DeploymentChecklist />
        </TabsContent>
      </Tabs>
    </div>
  );
}
