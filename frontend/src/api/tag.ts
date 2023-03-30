import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default async function test(image: File, area: string) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('area', area);
  const res = await api.post('/article/image', {
    formData,
  });
  console.log(res);
}
