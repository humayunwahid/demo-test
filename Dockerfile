# Use the latest stable Node.js image as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies.  Use --no-cache for smaller image size.
RUN npm install --force

# Copy the entire application source code
COPY . .

# Debugging commands:
RUN pwd
RUN ls -al
RUN echo "Current directory contents:"
RUN find . -maxdepth 3 -type f -print # List files

# Build the application for production
RUN npm run build

# Use a lightweight Nginx image to serve the static assets
FROM nginx:alpine

# Copy the built assets from the 'builder' stage to the Nginx web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80, the default HTTP port
EXPOSE 80

# Optional: Add a health check (recommended for production deployments)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
