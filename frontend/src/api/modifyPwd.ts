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
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
}

async function modifyPwd(
  id: number,
  password: string,
  newPassword: string,
  salt: string
) {
  try {
    const res = await api.put(`/user/${id}/modify-password`, {
      newPassword,
      password,
      salt,
    });
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { getSalt, modifyPwd };
