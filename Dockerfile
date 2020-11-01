FROM node:alpine

WORKDIR /var/www/docker101

COPY . .

ENV PORT=3000

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]

