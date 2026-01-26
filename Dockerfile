# -------------------------
# Stage 1: Build
# -------------------------
FROM node:22 AS builder

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy all source files
COPY . .

# Build the frontend
RUN pnpm build

# -------------------------
# Stage 2: Serve with Nginx
# -------------------------
FROM nginx:alpine

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config if you have one
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
