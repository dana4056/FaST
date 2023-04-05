import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { storage } from '../utils/firebase';
import {
  doWriteArticle,
  doGetArticles,
  doGetArticle,
  doModifyArticle,
  doGetFollowArticles,
  doGetMyArticles,
  doDeleteArticle,
  doSearchArticles,
} from '../api/article';
import uuid from '../utils/uuid';
import doGetAutoTags from '../api/tag';

const ArticleViewModel = () => {
  const uploadImages = async (images: Array<File>) => {
    const paths: Array<string> = [];
    // await Promise.all(
    //   images.map(async (image: File) => {
    //     const path = `article/${uuid()}`;
    //     await uploadBytes(ref(storage, path), image);
    //     paths.push(path);
    //   })
    // );
    return paths;
  };
  const downloadImages = async (images: Array<string>) => {
    const ret: Array<string> = [];

    // await Promise.all(
    //   images.map(async (image: string) => {
    //     const url = await getDownloadURL(ref(storage, image));
    //     ret.push(url);
    //   })
    // );
    return ret;
  };
  const deleteImage = async (imageUrl: string) => {
    await deleteObject(ref(storage, imageUrl));
  };
  const writeArticle = async (requestBody: any) => {
    const res = await doWriteArticle(requestBody);
    return res;
  };
  const modifyArticle = async (requestBody: any) => {
    const res = await doModifyArticle(requestBody);
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

  const getArticle = async (articleId: string, userId: number) => {
    const res = await doGetArticle(articleId, userId);
    return res;
  };

  const getArticles = async (userId: number, size: number, offset: number) => {
    const res = await doGetArticles(userId, size, offset);
    return res;
  };

  const deleteArticle = async (articleId: number, userId: number) => {
    const res = await doDeleteArticle(articleId, userId);
    return res;
  };

  const getFollowArticles = async (
    userId: number,
    size: number,
    offset: number
  ) => {
    const res = await doGetFollowArticles(userId, size, offset);
    return res;
  };

  const getMyArticles = async (
    userId: number,
    loginId: number,
    size: number,
    offset: number
  ) => {
    const res = await doGetMyArticles(userId, loginId, size, offset);
    return res;
  };

  const searchArticles = async (
    userId: number,
    size: number,
    offset: number,
    flag: string,
    tags: string
  ) => {
    const res = await doSearchArticles(userId, size, offset, flag, tags);
    return res;
  };

  return {
    uploadImages,
    writeArticle,
    modifyArticle,
    createAutoTags,
    getArticles,
    getFollowArticles,
    downloadImages,
    getArticle,
    deleteImage,
    deleteArticle,
    getMyArticles,
    searchArticles,
  };
};

export default ArticleViewModel;
