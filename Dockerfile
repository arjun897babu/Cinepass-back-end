FROM node:18.17.1-alpine

WORKDIR /server

COPY package*.json .

RUN npm install 

COPY . .

RUN mkdir -p /server/uploads

EXPOSE 3001

CMD [ "npm","run","dev2" ]