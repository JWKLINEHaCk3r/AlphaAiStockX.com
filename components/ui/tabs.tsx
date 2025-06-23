"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

const TabsContext = React.createContext<{
  value: string
  setValue: (v: string) => void
} | null>(null)

export function Tabs({ defaultValue, className, children }: { defaultValue: string, className?: string, children: React.ReactNode }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={`flex gap-2 ${className || ''}`}>{children}</div>
}

export function TabsTrigger({ value, className, children }: { value: string, className?: string, children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs")
  const active = ctx.value === value
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${active ? "bg-fuchsia-600 text-white" : "bg-black/30 text-fuchsia-200 hover:bg-fuchsia-800/40"} ${className || ''}`}
      onClick={() => ctx.setValue(value)}
      data-state={active ? "active" : undefined}
      type="button"
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, children }: { value: string, children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error("TabsContent must be used within Tabs")
  if (ctx.value !== value) return null
  return <div className="mt-4">{children}</div>
}
