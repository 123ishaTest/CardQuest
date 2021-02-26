# develop stage
FROM node:15.0-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
