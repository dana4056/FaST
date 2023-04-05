import express, { Express, Request, Response } from 'express';
import multer from 'multer';

import * as cors from 'cors';

const app: Express = express();

const port = 6060;

app.use(cors.default());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
  console.log(req.file);
  const file = req.file;
  if (!file) {
    res.status(400).json({ message: '이미지를 업로드해주세요.' });
  } else {
    const imagePath = file.path;
    res.status(200).json({ imagePath });
  }
});

app.get('/image/:imageName', (req: Request, res: Response) => {
  const imageName = req.params.imagename;
  const imagePath = 'uploads/' + imageName;
  res.sendFile(imagePath, { root: __dirname });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
