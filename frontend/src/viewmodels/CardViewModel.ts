import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../utils/firebase';
import { doWriteArticle } from '../api/article';

const CardViewModel = () => {
  const uploadImages = async (id: number, images: Array<File>) => {
    images.map(async (image: File) => {
      const result = await uploadBytes(
        ref(storage, `article/${id}/${image.name}`),
        image
      );
      console.log(result);
    });
  };
  const writeArticle = async (requestBody: any) => {
    const response = await doWriteArticle(requestBody);
    console.log(response);
  };
  return { uploadImages, writeArticle };
};

export default CardViewModel;
