# Step 1: Use an official Node.js image as the base image
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies with debugging output
RUN npm install --legacy-peer-deps

# Print directory contents for debugging purposes
RUN ls -l /app

# Copy the rest of your React project files
COPY . .

# Check if the build script exists in package.json
RUN cat package.json | jq '.scripts'

# Run build and capture logs
RUN npm run build || tail -n 10 /root/.npm/_logs/*-debug.log

# Expose the port that the app will run on
EXPOSE 80

# Use Nginx to serve the built React app
FROM nginx:alpine

# Copy build artifacts from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the container to be accessed
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
