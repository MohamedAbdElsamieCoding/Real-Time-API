# Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

# Swagger
COPY src/docs/swagger.yaml ./src/docs/swagger.yaml

EXPOSE 5000
CMD [ "npm", "start" ]