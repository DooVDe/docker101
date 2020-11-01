const express = require('express');
const mustache = require('mustache');
const path = require('path');
const {readFileSync} = require('fs');
const app = express();
const redis = require("redis");
const { promisify } = require("util");

// Config
const HTTP_PORT     = process.env.HTTP_PORT  ? parseInt(process.env.HTTP_PORT)  : 8080;
const REDIS_HOST    = process.env.REDIS_HOST ? process.env.REDIS_HOST           : '127.0.0.1';

// Init
const client = redis.createClient({host: REDIS_HOST});
const indexHtml = readFileSync(path.join(__dirname, '..', 'templates', 'index.html'), 'utf-8');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

app.get('/', async (req, res) => {
    const {set} = req.query;

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

app.listen(HTTP_PORT, () => {
    console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
});
