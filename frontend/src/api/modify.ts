import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

const id = 8;
// 내 정보 조회
async function getMyData(toId: number) {
  try {
    const res = await api.get<number>(`/user/${id}`, { params: { id } });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { getMyData };
