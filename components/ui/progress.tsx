import React from "react"

interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export const Progress = ({ value, max = 100, className = "" }: ProgressProps) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div className={`w-full h-3 futuristic-card animated-neon-border overflow-hidden ${className}`} role="progressbar" aria-valuenow={value} aria-valuemax={max} aria-valuemin={0}>
      <div
        className="h-full holo-shimmer"
        style={{
          width: `${percent}%`,
          background: "linear-gradient(90deg,#0fffc1,#7e0fff,#00e0ff)",
          boxShadow: "0 0 16px 2px #0fffc1,0 0 32px 4px #7e0fff"
        }}
      />
    </div>
  )
}
export default Progress
