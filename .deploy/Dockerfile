FROM node:22-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm test
ENV VITE_APP_API_URL=/api VITE_APP_API_URL_MINE=
RUN npm run build

FROM nginx:stable-alpine
COPY .deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY .deploy/proxy.conf /etc/nginx/proxy_params
COPY --from=build /src/dist /usr/share/nginx/html
