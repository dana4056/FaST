import axios from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async function doGetLandmarks(userId: number) {
  try {
    const res = await api.get(`/landmark/${userId}}`);
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}
