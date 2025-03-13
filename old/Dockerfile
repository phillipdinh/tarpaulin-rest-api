FROM node:14

WORKDIR /usr/src

COPY package*.json ./

RUN npm install && npm audit fix

COPY . .

EXPOSE 8080

CMD [ "node --trace-warnings", "src/server.js" ]