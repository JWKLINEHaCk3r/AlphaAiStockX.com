"use client"

import * as React from "react"

export function Switch({ checked, onCheckedChange }: { checked: boolean, onCheckedChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-fuchsia-600' : 'bg-slate-600'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}
