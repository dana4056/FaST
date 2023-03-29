import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
export async function doWriteArticle(requestBody: any) {
  try {
    const res = await api.post(`/article`, requestBody);

    return res.status;
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
