import express from 'express';

// Config
const HTTP_PORT: number = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080;

// Defines
const app = express();

// Logic
app.get('/', async (req, res) => {
  const date = new Date();
  const content = `Date: ${date.toString()}<br>Env: ${process.env.NODE_ENV}`;
  console.log(`Request@${date.toString()}`);

  res.send(`<h1>Hello world!</h1><pre>${content}</pre>`);
});

// Init
app.listen(HTTP_PORT, () => {
  console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
});
