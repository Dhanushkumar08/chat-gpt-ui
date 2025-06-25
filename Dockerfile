# Step 1: Build the app using Node.js
FROM node:16 AS build

WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package.json ./
# COPY package-lock.json ./  # This will not break even if the file is missing

RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

# sh 'sonar-scanner -Dsonar.projectKey=my-project -Dsonar.sources=src -Dsonar.host.url=http://192.168.28.128:9000 -Dsonar.login=sqb_00179cd78e58f7638a0086126c2e106d07d70064'
