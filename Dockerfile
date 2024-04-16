FROM node:20.12-alpine3.18 AS build-stage
WORKDIR /app

# Copy package.json and package-lock.json first to benefit from cached Docker layers
COPY package*.json ./

# Remove node_modules and package-lock.json then reinstall dependencies
RUN rm -rf node_modules package-lock.json && npm install

# Copy the rest of the project files
COPY . .

# Run the build command
RUN npm run build -- --debug


# production stage
FROM nginx:1.24-alpine3.17 AS production-stage
WORKDIR /app
# coyp โฟลเดอร์ dist จาก build-stage มาไว้ที่ /app ใน production-stage
COPY --from=build-stage /app/dist ./
COPY nginx.conf /etc/nginx/nginx.conf