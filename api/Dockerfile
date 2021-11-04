FROM node:12.19.0-alpine3.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

COPY ./properties/.container.env ./properties/.env

RUN npm run build

CMD ["pm2-runtime", "dist/main.js"]