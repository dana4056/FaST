import axios from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function doCreateComment(
  articleId: string,
  content: string,
  userId: number
) {
  try {
    const res = await api.post('/comment', {
      articleId: Number(articleId),
      content,
      userId,
    });
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}

export async function doDeleteComment() {
  console.log('test');
}

export async function doGetComments(
  articleId: string,
  userId: number,
  size: number,
  offset: number
) {
  try {
    const res = await api.get(
      `/comment/${articleId}/${userId}/${size}/${offset}`
    );
    return res;
  } catch (error: any) {
    console.error(error);
    return error;
  }
}
