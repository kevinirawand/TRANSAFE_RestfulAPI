FROM node:20-alpine3.16

WORKDIR /usr/src/app

COPY src/package.json /usr/src/app/

RUN npm install

COPY src/ .

EXPOSE 5000

ENTRYPOINT [ "npm", "start" ]

