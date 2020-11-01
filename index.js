const express = require('express');
const mustache = require('mustache');
const path = require('path');
const {readFileSync} = require('fs');
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const indexHtml = readFileSync(path.join('./templates/index.html'), 'utf-8');

app.get('/', (req, res) => {
    const params = {
        nodeVersion: process.version,
        port: port
    };

    const template = mustache.render(indexHtml, params);
    res.send(template);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


function total() {

}
