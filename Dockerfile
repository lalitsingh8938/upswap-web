# Use official Nginx image
FROM nginx:alpine
 
# Copy custom Nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf
 
# Copy React build to Nginx's public directory
COPY build/ /usr/share/nginx/html/
 
# Expose port
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]



# # Step 1: Build the app
# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Step 2: Serve the production build using serve
# FROM node:18-alpine

# RUN npm install -g serve
# WORKDIR /app

# COPY --from=builder /app/build ./build

# EXPOSE 3000

# CMD ["serve", "-s", "build", "-l", "3000"]

