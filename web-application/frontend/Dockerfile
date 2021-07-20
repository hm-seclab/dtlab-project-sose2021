FROM node:lts-alpine as builder
WORKDIR /app
ARG VUE_APP_BACKEND_URL
ENV VUE_APP_BACKEND_URL=$VUE_APP_BACKEND_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod
ENV NODE_ENV=produdction

COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]