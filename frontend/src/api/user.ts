import axios, { AxiosError, AxiosResponse } from 'axios';
import { getErrorMessage } from 'three-stdlib';
import { TagType } from '../types/TagType';

const api = axios.create({
  baseURL: 'https://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 내 정보 조회
async function getMyData(id: number) {
  try {
    const res = await api.get<number>(`/user/${id}`, { params: { id } });
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 게시물 수 조회
async function countArticle(id: number) {
  try {
    const res = await api.get<number>(`/article/${id}`, {
      params: { id },
    });
    // console.log(res);
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
  } catch (error: any) {
    if (error.response.status === 409) {
      alert('중복된 닉네임입니다. 다른 닉네임으로 시도해주세요');
    }
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
