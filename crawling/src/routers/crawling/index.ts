import express, { Request, Response } from 'express';
import axios from 'axios';

const cheerio = require('cheerio');

const router = express.Router();

router.get('/:landmark', async (req: Request, res: Response) => {
  let query;
  switch (req.params.landmark) {
    case 'building63':
      query = 'docId=1081761&cid=40942&categoryId=33083';
      break;

    case 'gwangandaegyo':
      query = 'docId=1221413&cid=40942&categoryId=35104';
      break;
    case 'gwanghwamun':
      query = 'docId=1065227&cid=40942&categoryId=33076';
      break;
    case 'seoultower':
      query = 'docId=1111331&cid=40942&categoryId=33084';
      break;
    case 'dolhareubang':
      query = 'docId=1083851&cid=40942&categoryId=32175';
      break;
    case 'lottetower':
      query = 'docId=3566253&cid=40942&categoryId=33083';
      break;
    case 'seokguram':
      query = 'docId=1111522&cid=40942&categoryId=31548';
      break;
    case 'seongsan':
      query = 'docId=1112595&cid=40942&categoryId=33147';
      break;
    case 'kingsejong':
      query = 'docId=1113251&cid=40942&categoryId=33383';
      break;
    case 'sungnyemun':
      query = 'docId=1111278&cid=40942&categoryId=33383';
      break;
    case 'olympicpark':
      query = 'docId=1129067&cid=40942&categoryId=34709';
      break;
    case 'yisunshin':
      query = 'docId=1134958&cid=40942&categoryId=33383';
      break;
    case 'chinatown':
      query = 'docId=1145410&cid=40942&categoryId=31620';
      break;
    case 'cheongwadae':
      query = 'docId=1146706&cid=40942&categoryId=31645';
      break;
    case 'cheomseongdae':
      query = 'docId=1060528&cid=40942&categoryId=33375';
      break;
    default:
      query = 'none';
      break;
  }
  if (query === 'none') {
    res.status(404).send({
      msg: 'No data',
    });
  } else {
    const crawlingRes = await axios.get(`https://terms.naver.com/entry.naver?${query}`);

    const htmlString = crawlingRes.data;
    const $ = cheerio.load(htmlString);
    const data: String = $('dl.summary_area').text();
    res.send({ data: data.substring(14, data.length) });
  }
});

export default router;
