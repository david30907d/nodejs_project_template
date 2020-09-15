FROM node:14.8.0-alpine3.11 AS builder

ENV PATH="./node_modules/.bin:$PATH"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
CMD ["serve", "-s", "build"]