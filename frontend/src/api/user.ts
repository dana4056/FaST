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
    const res = await api.get<number>(`/user/${id}`, { params: { id } });
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 게시물 수 조회
async function countArticle(id: number) {
  try {
    const res = await api.get<number>(`/article/${userId}`, {
      params: { userId },
    });
    console.log(res);
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
  nickName: string,
  tags: Array<TagType>
) {
  try {
    const res = await api.put<any>(`/user/${id}/modify-user`, {
      imgPath,
      nickName,
      tags,
    });
    console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    console.log(id, { imgPath, nickName, tags });
    return error;
  }
}

// 회원 탈퇴
async function goWithdraw(id: number) {
  try {
    const res = await api.delete(`/user/${id}`);

    console.log(res.data);
    return res.status;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

export default { getMyData, countArticle, modifyData, goWithdraw };
