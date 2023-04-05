import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';

import * as cors from 'cors';

const app: Express = express();

const port = 6060;

const __dirname = path.resolve();

app.use(cors.default());

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    cb(null, `images/profiles/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    cb(null, `images/articles/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const profileUpload = multer({ storage: profileStorage });
const articleUpload = multer({ storage: articleStorage });

app.post('/upload/profile', profileUpload.single('image'), (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: '이미지를 업로드해주세요.' });
  } else {
    const imagePath = file.path;
    res.status(200).json({ imagePath });
  }
});
app.post('/upload/article', articleUpload.single('image'), (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: '이미지를 업로드해주세요.' });
  } else {
    const imagePath = file.path;
    res.status(200).json({ imagePath });
  }
});
app.use('/images/articles', express.static('images/articles'));
app.use('/images/profiles', express.static('images/profiles'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
