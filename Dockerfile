# Multi-stage build for production

# Backend
FROM node:18-alpine AS backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ ./
EXPOSE 5000

# Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Final production image
FROM node:18-alpine
WORKDIR /app

# Copy backend
COPY --from=backend /app/server ./server
WORKDIR /app/server

# Copy frontend build
COPY --from=frontend-build /app/client/dist ./client/dist

# Install serve for frontend
RUN npm install -g serve

# Expose ports
EXPOSE 5000 3000

# Start script
COPY docker-start.sh /app/
RUN chmod +x /app/docker-start.sh

CMD ["/app/docker-start.sh"]
