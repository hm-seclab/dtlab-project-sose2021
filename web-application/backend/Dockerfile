FROM node:lts-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
EXPOSE 3000

FROM base as prod
ENV NODE_ENV=production
RUN npm install
COPY . .
CMD ["npm", "run", "start:prod"]
