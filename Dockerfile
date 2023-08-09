FROM node:18-alpine
RUN apk add --no-cache --virtual .gyp g++ make py3-pip

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install && npm install -g typescript ts-node
COPY src ./src
COPY .env ./.env

EXPOSE 8080:8080
CMD tsc && ts-node /usr/app/src/index.ts