import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
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
) {
  try {
    const res = await api.post(`/api/user`, {
      email,
      imgPath,
      nickname,
      password,
      salt,
    });

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { sendEmail, checkEmail, signUp };
