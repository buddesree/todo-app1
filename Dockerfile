# Stage 1: Build the app
FROM node:16.16 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all other files and build the app
COPY . ./
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Update Nginx configuration to listen on all interfaces (0.0.0.0)
RUN sed -i 's/listen 80/listen 0.0.0.0:80/' /etc/nginx/nginx.conf

# Expose port 80 to access the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
