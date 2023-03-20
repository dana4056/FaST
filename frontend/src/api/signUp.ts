import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function sendEmail(email: string) {
  try {
    const res = await api.post(`/api/user/send-email`, {
      email,
    });

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function checkEmail(email: string, code: string) {
  try {
    const res = await api.post(`/api/user/check-code`, {
      code,
      email,
    });
    console.log(res.status);
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
    const res = await api.post<any>(`/api/user`, {
      email,
      imgPath,
      nickname,
      password,
      salt,
    });
    console.log(res);
    console.log(res.status);
    console.log(res.data.id);
    return res;
  } catch (error: any) {
    console.log(error);
    // console.log(error.response.data.status);
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
