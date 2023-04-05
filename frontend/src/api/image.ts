import axios, { AxiosError, AxiosResponse } from 'axios';
import { decryptToken } from '../utils/passwordEncryption';

const api = axios.create({
  baseURL: 'http://localhost:6060',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('token'),
  },
});

async function uploadImage(
  image: File,
  dir: string,
  name: string,
  email: string
) {
  try {
    const formData = new FormData();
    formData.append('image', image, name);
    const res = await axios.post(`/upload/${dir}`, formData, {
      baseURL: 'http://j8a402.p.ssafy.io:6060',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: decryptToken(
          String(localStorage.getItem('token')),
          email
        ),
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function deleteImage(imagePath: string, email: string) {
  try {
    const res = await axios.delete(`/delete/${imagePath}`, {
      baseURL: 'http://j8a402.p.ssafy.io:6060',
      headers: {
        'Content-Type': 'application/json',
        Authorization: decryptToken(
          String(localStorage.getItem('token')),
          email
        ),
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  uploadImage,
  deleteImage,
};
