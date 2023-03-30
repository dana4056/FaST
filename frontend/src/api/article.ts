import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRecoilState } from 'recoil';
import { userInfo } from '../atoms/userInfo';
import { TagType } from '../types/TagType';

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
    console.log(requestBody);
    const res = await api.post(`/article`, requestBody);

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

export default { getUserArticle };
