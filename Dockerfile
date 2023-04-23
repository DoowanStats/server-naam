FROM node:16-alpine AS builder

WORKDIR /app
COPY package*.json ./

# for node-gyp    
RUN apk add --no-cache python3 make g++
RUN npm install
COPY . .
RUN npm run build

EXPOSE 5000

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/build .
COPY --from=builder /app/node_modules /node_modules

ENTRYPOINT [ "node", "./server.js" ]