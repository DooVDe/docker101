import express from 'express';
import mustache from 'mustache';
import path from 'path';
import redis from 'redis';
import { readFileSync } from 'fs';
import { promisify } from "util";
import {hello} from '../lib/functions';

// Config
const HTTP_PORT: number = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080;
const REDIS_HOST: string = process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1';

// Defines
const app = express();
const client = redis.createClient({ host: REDIS_HOST });
const indexHtml = readFileSync(path.join(__dirname, '..', '..', 'templates', 'index.html'), 'utf-8');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Logic
app.get('/', async (req, res) => {
  const { set } = req.query;
  console.log('Got request!', (new Date()).toString());

  if (set === 'true') {
    await setAsync('time', (new Date()).toString());
  }

  const params = {
    nodeVersion: process.version,
    httpPort: HTTP_PORT,
    redisHost: REDIS_HOST,
    redisSet: set === 'true' ? set : 'false',
    time: await getAsync('time') || '---',
  };

  const template = mustache.render(indexHtml, params);
  res.send(template);
});

// Init
app.listen(HTTP_PORT, () => {
  console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
});
