import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 유저 게시물 조회
async function getUserArticle(userId: number, size: number, offset: number) {
  try {
    const res = await api.get<number>(
      `/article/user/${userId}/${size}/${offset}`,
      { params: { userId, size, offset } }
    );
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function doWriteArticle(requestBody: any) {
  try {
    const res: AxiosResponse = await api.post(`/article`, requestBody);

    return res.status;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function doModifyArticle(requestBody: any) {
  try {
    const res = await api.put('/article/modify-article', requestBody);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export async function sendEmail(email: string) {
  try {
    const res = await api.post(`/user/send-email`, {
      email,
    });

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function doGetArticle(articleId: string, userId: number) {
  try {
    const res = await api.get(`/article/${articleId}/${userId}`);
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function userArticleLike(articleId: number, userId: number) {
  try {
    const res = await api.get('/likes/article', {
      params: { articleId, userId },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function doGetArticles(
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(`/article/tag/${userId}/${size}/${offset}`);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function doGetFollowArticles(
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(`/article/follow/${userId}/${size}/${offset}`);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function doSearchArticles(
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(
      `/article/tag-search/${userId}/${size}/${offset}`
    );
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function doGetMyArticles(
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(`/article/user/${userId}/${size}/${offset}`);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

// 게시물 좋아요 api
async function articleLike(articleId: number, userId: number) {
  try {
    const res = await api.get(`/likes/article`, {
      params: { articleId, userId },
    });
    // console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
export default {
  getUserArticle,
  userArticleLike,
  articleLike,
};
