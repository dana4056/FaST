import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getSalt(email: string): Promise<AxiosResponse> {
  try {
    const res = await api.post<any>(`/api/user/salt`, {
      email,
    });

    console.log(res.status);
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function login(email: string, password: string) {
  try {
    const res = await api.post(`/api/login`, {
      email,
      password,
    });

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { login, getSalt };
