import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../utils/firebase';
import { doWriteArticle, doGetArticles } from '../api/article';
import uuid from '../utils/uuid';
import doGetAutoTags from '../api/tag';

const ArticleViewModel = () => {
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
  const downloadImages = async (images: Array<string>) => {
    const ret: Array<string> = [];

    await Promise.all(
      images.map(async (image: string) => {
        const url = await getDownloadURL(ref(storage, image));
        ret.push(url);
      })
    );
    return ret;
  };
  const writeArticle = async (requestBody: any) => {
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

  const getArticles = async (userId: number, size: number, offset: number) => {
    const res = await doGetArticles(userId, size, offset);
    return res;
  };
  return {
    uploadImages,
    writeArticle,
    createAutoTags,
    getArticles,
    downloadImages,
  };
};

export default ArticleViewModel;
