# Step 1: Use an official Node.js image as the base image
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your React project files
COPY . .

# Build the application
RUN npm run build --force
