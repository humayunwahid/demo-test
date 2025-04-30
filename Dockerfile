# Step 1: Use an official Node.js image as the base image
FROM node:16-alpine as build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lighter web server image for serving the build
FROM nginx:alpine

# Step 8: Copy the build folder to the Nginx server's public folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the default Nginx port
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]