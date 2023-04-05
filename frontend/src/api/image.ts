import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:6060',
  headers: {
    'Content-Type': 'application/json',
  },
});

async function upload(image: File, dir: string) {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const res = await api.post(`/upload/${dir}`, formData);

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export default {
  upload,
};
