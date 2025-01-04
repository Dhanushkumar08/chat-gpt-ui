# Step 1: Build the app using Node.js
FROM node:16 AS build

WORKDIR /app

RUN npm install

COPY package.json package-lock.json ./

COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html