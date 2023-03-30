import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../utils/firebase';
import { doWriteArticle } from '../api/article';
import uuid from '../utils/uuid';

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
    console.log(requestBody);
    // const response = await doWriteArticle(requestBody);
  };
  return { uploadImages, writeArticle };
};

export default CardViewModel;
