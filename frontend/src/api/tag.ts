import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:5000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default async function doGetAutoTags(image: File, area: string) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('area', area);
  try {
    const res = await api.post('/article/image', formData);
    return res;
  } catch (error: any) {
    return error;
  }
}
