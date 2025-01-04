# Step 1: Build the app using Node.js
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package.json ./
COPY package-lock.json ./  # This will not break even if the file is missing

RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html