import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 팔로워 수 조회
async function followTo(toId: number) {
  try {
    const res = await api.get<number>(`/follow/to`, { params: { toId } });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 팔로잉 수 조회
async function followFrom(fromId: number) {
  try {
    const res = await api.get<number>(`/follow/from`, { params: { fromId } });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 팔로우 목록 조회
async function followList(id: number) {
  try {
    const res = await api.post<number>('/follow/search', { id });
    // console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 팔로우 삭제
async function followDelete(fromId: number, toId: number) {
  try {
    const res = await api.delete<number>('/follow', {
      params: { fromId, toId },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { followTo, followFrom, followList, followDelete };
