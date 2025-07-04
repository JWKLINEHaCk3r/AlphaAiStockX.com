import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import IONOSDeploymentGuide from './IONOSDeploymentGuide';
import IONOSFTPGuide from './IONOSFTPGuide';
import IONOSCustomDomainSetup from './IONOSCustomDomainSetup';
import IONOSSSLSetup from './IONOSSSLSetup';
import IONOSDeploymentChecklist from './IONOSDeploymentChecklist';

export default function IONOSMasterGuide() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">AlphaAIStockX IONOS Deployment</h1>
      <p className="text-xl text-center mb-8 text-gray-600">
        Complete guide to hosting your AI trading platform on IONOS
      </p>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ftp">FTP Guide</TabsTrigger>
          <TabsTrigger value="domain">Domain Setup</TabsTrigger>
          <TabsTrigger value="ssl">SSL Setup</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <IONOSDeploymentGuide />
        </TabsContent>
        <TabsContent value="ftp">
          <IONOSFTPGuide />
        </TabsContent>
        <TabsContent value="domain">
          <IONOSCustomDomainSetup />
        </TabsContent>
        <TabsContent value="ssl">
          <IONOSSSLSetup />
        </TabsContent>
        <TabsContent value="checklist">
          <IONOSDeploymentChecklist />
        </TabsContent>
      </Tabs>
    </div>
  );
}
