FROM node:12-alpine

WORKDIR /var/www/webapp/

ENV NODE_ENV=production

COPY *.json ./
COPY src ./src

RUN npm ci \
    && npm run build \
    && rm -rf src

ENTRYPOINT ["npm", "run", "start"]
