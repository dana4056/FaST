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
import api from '../api/image';

const ArticleViewModel = () => {
  const uploadImages = async (
    images: Array<File>,
    dir: string,
    email: string
  ) => {
    const paths: Array<string> = [];
    await Promise.all(
      images.map(async (image: File) => {
        const name = uuid();
        const res: any = await api.uploadImage(image, dir, name, email);
        if (res.status === 200) {
          paths.push(`${dir}s/${name}`);
        }
      })
    );
    return paths;
  };
  const downloadImages = async (images: Array<string>) => {
    const ret: Array<string> = [];
    await Promise.all(
      images.map(async (image: string) => {
        const url = `https://j8a402.p.ssafy.io:4041/images/${image}`;
        ret.push(url);
      })
    );
    return ret;
  };
  const deleteImage = async (imagePath: string, email: string) => {
    const res = await api.deleteImage(imagePath, email);
    return res;
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
        if (res.data) {
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
