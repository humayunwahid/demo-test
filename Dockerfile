# Use the latest stable Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies.  Use --no-cache for smaller image size.
RUN npm install --no-cache

# Copy the entire application source code
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight Alpine Linux base image for the production stage
FROM nginx:alpine AS production

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port that Nginx will listen on
EXPOSE 80

# Optionally, add a health check (recommended for production)
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
