import express from 'express';
import mustache from 'mustache';
import path from 'path';
import redis from 'redis';
import { readFileSync } from 'fs';
import { promisify } from "util";
import {hello} from '../lib/functions';

// // Config
const HTTP_PORT: number = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 8080;
const REDIS_HOST: string = process.env.REDIS_HOST ? process.env.REDIS_HOST : '127.0.0.1';

// // Init
const app = express();
const client = redis.createClient({ host: REDIS_HOST });
const indexHtml = readFileSync(path.join(__dirname, '..', '..', 'templates', 'index.html'), 'utf-8');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

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

app.listen(HTTP_PORT, () => {
  hello(1);
  console.log(`Example app listening at http://localhost:${HTTP_PORT}`);
});

// interface User<T> {
//     name: string,
//     age: number,
//     qwe: T
// }

// class AdvancedUser implements User<number> {
//     public name:string;
//     public age:number;
//     public qwe:number;

//     constructor(name:string, age:number, qwe:number) {
//         this.name = name;
//         this.age = age;
//         this.qwe = qwe;
//     }
// }


// export namespace Foo {
//     // this coolest function ever
//     export async function bar(str: User<number>) : Promise<number> {
//         console.log('str is ', str)
//         return 42
//     }
// }

// Foo.bar(new AdvancedUser('hello', 32, 100));