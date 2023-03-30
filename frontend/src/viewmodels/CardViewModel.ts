import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../utils/firebase';
import { doWriteArticle } from '../api/article';
import uuid from '../utils/uuid';
import doGetAutoTags from '../api/tag';

const CardViewModel = () => {
  const uploadImages = async (images: Array<File>) => {
    const paths: Array<string> = [];
    await Promise.all(
      images.map(async (image: File) => {
        const path = `article/${uuid()}`;
        await uploadBytes(ref(storage, path), image);
        paths.push(path);
      })
    );
    return paths;
  };
  const writeArticle = async (requestBody: any) => {
    // console.log(requestBody);
    const res = await doWriteArticle(requestBody);
    return res;
  };

  const createAutoTags = async (images: Array<File>, area: string) => {
    let ret: Array<string> = [];
    await Promise.all(
      images.map(async (image: File) => {
        const res = await doGetAutoTags(image, area);
        if (res.data.length > 0) {
          ret = ret.concat(res.data);
        }
      })
    );
    return ret;
  };
  return { uploadImages, writeArticle, createAutoTags };
};

export default CardViewModel;
