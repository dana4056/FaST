import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://j8a402.p.ssafy.io:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getSalt(email: string): Promise<AxiosResponse> {
  try {
    const res = await api.get(`/user/salt/${email}`);

    console.log(res.status);
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function login(email: string, password: string) {
  try {
    const res = await api.post(`/user/login`, {
      email,
      password,
    });
    const { headers, data } = res;
    console.log(headers);

    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { login, getSalt };
