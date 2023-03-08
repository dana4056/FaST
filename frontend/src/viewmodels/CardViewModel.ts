import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../utils/firebase';

const CardViewModel = () => {
  const uploadImages = async (images: Array<File>) => {
    images.map(async (image: File) => {
      const result = await uploadBytes(
        ref(storage, `test/${image.name}`),
        image
      );
      console.log(result);
    });
  };
  return { uploadImages };
};

export default CardViewModel;
