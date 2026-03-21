FROM node:20-alpine AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
# RUN npm run lint

FROM node:20-alpine AS production
RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001 -G nodejs
WORKDIR /app
COPY --from=builder --chown=nodeuser:nodejs /build/node_modules ./node_modules
COPY --chown=nodeuser:nodejs server.js package.json ./
USER nodeuser
EXPOSE 3000
CMD ["node", "server.js"]