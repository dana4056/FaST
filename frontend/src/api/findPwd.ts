import axios from 'axios';

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

async function findPwd(email: string, password: string, salt: string) {
  try {
    const res = await api.put(`/user/find-pw`, {
      email,
      password,
      salt,
    });
    return res.status;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default { sendEmail, checkEmail, findPwd };
