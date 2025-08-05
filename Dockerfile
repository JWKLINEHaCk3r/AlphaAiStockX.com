# Use the official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy package files and configuration
COPY package.json pnpm-lock.yaml* .npmrc .pnpmfile.cjs ./

# Configure pnpm and install dependencies
RUN pnpm config set auto-install-peers true && \
    pnpm config set enable-pre-post-scripts true && \
    pnpm config set fund false && \
    pnpm config set audit false && \
    pnpm install --frozen-lockfile --prod=false

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Expose port
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["pnpm", "start"]
