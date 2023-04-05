import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';

import * as cors from 'cors';

const app: Express = express();

const port = 6060;

const __dirname = path.resolve();

app.use(cors.default());

const fileFilter = (req: any, file: any, cb: any) => {
  // 확장자 필터링
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true); // 해당 mimetype만 받겠다는 의미
  } else {
    // 다른 mimetype은 저장되지 않음
    req.fileValidationError = 'jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.';
    cb(null, false);
  }
};

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images/profiles/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images/articles/`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});
const articleUpload = multer({
  storage: articleStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

app.post('/upload/profile', profileUpload.single('image'), (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Headers', 'Authorization');
  console.log(req.file);
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: '이미지를 업로드해주세요.' });
  } else {
    const imagePath = file.path;
    res.status(200).json({ imagePath });
  }
});
app.post('/upload/article', articleUpload.single('image'), (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Headers', 'Authorization');
  const file = req.file;

  if (!file) {
    res.status(400).json({ message: '이미지를 업로드해주세요.' });
  } else {
    const imagePath = file.path;
    res.status(200).json({ imagePath });
  }
});
app.delete('/delete/article/:fileName', (req: Request, res: Response) => {
  if (fs.existsSync(`/images/articles/${req.params.fileName}`)) {
    try {
      fs.unlinkSync(`/images/articles/${req.params.fileName}`);
      res.status(200);
    } catch (error) {
      res.status(500);
    }
  }
});
app.delete('/delete/profile/:fileName', async (req: Request, res: Response) => {
  fs.unlink(`./images/profiles/${req.params.fileName}`, (error) => {
    if (error) {
      res.status(500).send('Fail');
    } else {
      res.status(200).send('Success');
    }
  });
});
app.use('/images/articles', express.static('images/articles'));
app.use('/images/profiles', express.static('images/profiles'));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
