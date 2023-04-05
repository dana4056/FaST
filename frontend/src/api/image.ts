import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6060',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: localStorage.getItem('token'),
  },
});

async function upload(image: File, dir: string, name: string) {
  try {
    const formData = new FormData();
    formData.append('image', image, name);
    const res = await api.post(`/upload/${dir}`, formData);

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default {
  upload,
};
