import express, { Express, Request, Response } from 'express';
import crawlingRouter from './routers/crawling';

const cors = require('cors');

const app = express();

app.set('port', 4040);

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express');
});

app.use('/crawling', crawlingRouter);

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});
