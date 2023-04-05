import axios, { AxiosError, AxiosResponse } from 'axios';
import { encryptToken } from '../utils/passwordEncryption';

const api = axios.create({
  baseURL: 'https://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getSalt(email: string): Promise<AxiosResponse> {
  try {
    const res = await api.get<any>(`/user/salt/${email}`);

    console.log(res.status);
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function login(email: string, password: string): Promise<AxiosResponse> {
  try {
    const res = await api.post(`/user/login`, {
      email,
      password,
    });

    // 토큰 저장
    localStorage.setItem(
      'token',
      encryptToken(res.headers.authorization, email)
    );

    console.log(res);
    // console.log(res.headers.authorization);
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

// 카카오 네이버 간편 로그인
async function fastLogin(token: string): Promise<AxiosResponse> {
  try {
    const res = await api.post(`/user/token`, {
      token,
    });
    console.log(res.status);
    console.log(res.data);
    localStorage.setItem('token', encryptToken(token, res.data.email));
    // console.log(res.headers.authorization);
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function registerTag(tags: Array<string>, userId: number) {
  try {
    const res = await api.post(`/tag`, {
      tags,
      userId,
    });
    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { login, getSalt, fastLogin, registerTag };
