import axios, { AxiosError, AxiosResponse } from 'axios';
import { TagType } from '../types/TagType';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 내 정보 조회
async function getMyData(id: number) {
  try {
<<<<<<< HEAD
=======
    const id = 5;
>>>>>>> 8ae0c177627edc2805892c0afb55af3f3818b31b
    const res = await api.get<number>(`/user/${id}`, { params: { id } });
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 게시물 수 조회
async function countArticle(userId: number) {
  try {
<<<<<<< HEAD
    const res = await api.get<number>(`/article/${userId}`, {
      params: { userId },
    });
    console.log(res);
=======
    const id = 5;
    const res = await api.get<number>(`/article/${userId}`, { params: { id } });
    // console.log(res);
>>>>>>> 8ae0c177627edc2805892c0afb55af3f3818b31b
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 내 정보 수정
async function modifyData(
  id: number,
  imgPath: string,
  nickname: string,
  tags: Array<TagType>
) {
  try {
    const res = await api.put<any>(`/user/${id}/modify-user`, {
      imgPath,
      nickname,
      tags,
    });
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { getMyData, countArticle, modifyData };
