FROM node:22.12-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3001

ENTRYPOINT ["node", "mcpServer.js","--sse"]

# CMD ["node", "mcpServer.js"] 