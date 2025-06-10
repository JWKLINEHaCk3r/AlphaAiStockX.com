"use client"
import { Badge } from "@/components/ui/badge"
import { Atom } from "lucide-react"

// Security Components
import QuantumResistantSecurity from "./components/security/QuantumResistantSecurity"

// Rest of the component remains the same...
export default function AlphaAIStockXDashboard() {
  // Component implementation stays the same
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header and navigation remain the same */}

      {/* Add the Quantum Security section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-500/30">
              <Atom className="w-4 h-4 mr-2" />
              Post-Quantum Security
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Future-Proof <span className="text-purple-400">Quantum Security</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Protect your investments with cutting-edge post-quantum cryptography, ensuring your assets remain secure
              even against future quantum computing threats.
            </p>
          </div>
          <QuantumResistantSecurity />
        </div>
      </section>

      {/* Rest of the sections remain the same */}
    </div>
  )
}
