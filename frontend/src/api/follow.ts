import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://j8a402.p.ssafy.io:8080',
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
async function followList(userId: number) {
  try {
    const res = await api.get<number>('/follow/search', { params: { userId } });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Not 팔로잉 목록 조회
async function notFollowingList(userId: number) {
  try {
    const res = await api.get<number>('/follow/not-follow', {
      params: { userId },
    });
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
      data: { fromId, toId },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// 팔로우 추가
async function followAdd(fromId: number, toId: number): Promise<AxiosResponse> {
  try {
    const res = await api.post<number>('/follow', { fromId, toId });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

export default {
  followTo,
  followFrom,
  followList,
  notFollowingList,
  followDelete,
  followAdd,
};
