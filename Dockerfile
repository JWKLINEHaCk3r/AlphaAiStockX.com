# Multi-stage Docker build for production
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat git

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Dependencies stage
FROM base AS deps
# Install dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Build stage
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

# Copy source code and fixer scripts to /app
COPY . .
COPY fix-card-imports.js /app/fix-card-imports.js
COPY fix-missing-cards.js /app/fix-missing-cards.js
COPY fix-missing-ui-imports.js /app/fix-missing-ui-imports.js
COPY fix-nextauth-imports.js /app/fix-nextauth-imports.js
COPY fix-typescript-errors.js /app/fix-typescript-errors.js

# Build arguments
ARG NODE_ENV=production
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_API_URL

# Set environment variables for build
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install runtime dependencies
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    curl \
    && rm -rf /var/cache/apk/*

# Copy built application
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy built files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

COPY --from=builder /app/fix-all-ui-imports.js ./fix-all-ui-imports.js
COPY --from=builder /app/fix-card-imports.js ./fix-card-imports.js
COPY --from=builder /app/fix-missing-cards.js ./fix-missing-cards.js
COPY --from=builder /app/fix-missing-ui-imports.js ./fix-missing-ui-imports.js
COPY --from=builder /app/fix-nextauth-imports.js ./fix-nextauth-imports.js
COPY --from=builder /app/fix-typescript-errors.js ./fix-typescript-errors.js

# Create logs directory
RUN mkdir -p /app/logs && chown nextjs:nodejs /app/logs

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
