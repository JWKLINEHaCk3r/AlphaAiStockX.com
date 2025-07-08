[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NEXT_TELEMETRY_DISABLED = "1"

[build.cache]
  paths = [
    ".next/cache",
    "node_modules/.cache"
  ]

[[plugins]]
  package = "@netlify/plugin-nextjs"
