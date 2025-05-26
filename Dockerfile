# Use official Node.js LTS image
FROM node:18-slim

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set working directory
WORKDIR /app

# Install dependencies first for better caching
COPY --chown=nextjs:nodejs package*.json ./
RUN npm install

# Copy the rest of the application code
COPY --chown=nextjs:nodejs . .

# Build the Next.js app
RUN npm run build

# Use non-root user
USER nextjs

# Expose the port your app runs on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]
