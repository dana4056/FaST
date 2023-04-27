import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function sendEmail(email: string) {
  try {
    const res = await api.post(`/user/send-email`, {
      email,
    });
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function checkEmail(email: string, code: string) {
  try {
    const res = await api.post(`/user/check-code`, {
      code,
      email,
    });
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function signUp(
  email: string,
  imgPath: string,
  nickname: string,
  password: string,
  salt: string
): Promise<AxiosResponse> {
  try {
    const res = await api.post<any>(`/user/signup`, {
      email,
      imgPath,
      nickname,
      password,
      salt,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    if (error.response.data.status) {
      alert('이미 존재하는 이메일 입니다. 다시 시도해 주세요.');
    }
    // const { status } = error.response.data.status;
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

export default { sendEmail, checkEmail, signUp, registerTag };
