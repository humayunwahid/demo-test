# Use a Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the entire React application code to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Expose the port that the app will run on.  Dokploy will route to this port.
EXPOSE 8080

# Define the command to run the application.  Use serve for production
CMD ["npm", "run", "start"]
