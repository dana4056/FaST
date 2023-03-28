import express, { Express, Request, Response } from 'express';
import crawlingRouter from './routers/crawling.js';

import * as cors from 'cors';

const app = express();

app.set('port', 4040);

app.use(cors.default());

app.get('/', (req: Request, res: Response) => {
  res.send(process.env.HEALTH);
});

app.use('/crawling', crawlingRouter);

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});
