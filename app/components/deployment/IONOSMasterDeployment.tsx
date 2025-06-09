import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import IONOSStepByStep from "./IONOSStepByStep"
import IONOSTroubleshooting from "./IONOSTroubleshooting"
import IONOSFileStructure from "./IONOSFileStructure"

export default function IONOSMasterDeployment() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚀 Complete IONOS Deployment Guide
        </h1>
        <p className="text-xl text-gray-600">Deploy AlphaAIStockX to alphaaistockx.com with confidence</p>
      </div>

      <Tabs defaultValue="stepbystep" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="stepbystep">Step-by-Step Guide</TabsTrigger>
          <TabsTrigger value="filestructure">File Structure</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="stepbystep">
          <IONOSStepByStep />
        </TabsContent>

        <TabsContent value="filestructure">
          <IONOSFileStructure />
        </TabsContent>

        <TabsContent value="troubleshooting">
          <IONOSTroubleshooting />
        </TabsContent>
      </Tabs>
    </div>
  )
}
