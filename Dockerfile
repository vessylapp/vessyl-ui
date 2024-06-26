FROM node:20

LABEL org.opencontainers.image.source=https://github.com/vessylapp/vessyl-ui

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT npm run env && npm run build && npm run start