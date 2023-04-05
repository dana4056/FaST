import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import https from 'https';
import crawlingRouter from './routers/crawling.js';

import * as cors from 'cors';

const options = {
  key: fs.readFileSync('src/config/privkey3.pem'),
  cert: fs.readFileSync('src/config/fullchain3.pem'),
};

const app = express();

app.set('port', 4040);

app.use(cors.default());

app.get('/', (req: Request, res: Response) => {
  res.send(process.env.HEALTH);
});

app.use('/crawling', crawlingRouter);
https.createServer(options, app).listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
