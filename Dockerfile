FROM node:20-alpine

WORKDIR /work

RUN apk update && apk add --no-cache wget

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 3000