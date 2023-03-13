import CryptoJS from 'crypto-js';

// salt를 만드는 함수
export const createSalt = () => {
  // 256비트 랜덤값 32바이트 결과값
  return CryptoJS.lib.WordArray.random(256 / 32).toString();
};

// salt와 평문 비밀번호로 암호화된 비밀번호를 만드는 함수
export const createHashedPassword = (plainPassword: string, salt: string) => {
  // 256비트 랜덤값, 32바이트 결과값, 707번 반복
  return CryptoJS.PBKDF2(plainPassword, salt, {
    keySize: 256 / 32,
    iterations: 402,
  }).toString();
};

// localstorage에 저장할 refresh token을 암호화하는 함수
export const encryptToken = (refreshToken: string, email: string) => {
  const key = email.padEnd(32, ' ');
  return CryptoJS.AES.encrypt(refreshToken, CryptoJS.enc.Utf8.parse(key), {
    iv: CryptoJS.enc.Utf8.parse(''),
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  }).toString();
};

// localstorage에 저장한 refresh token을 복호화하는 함수
export const decryptToken = (encryptedRefreshToken: string, email: string) => {
  const key = email.padEnd(32, ' ');
  return CryptoJS.AES.decrypt(
    encryptedRefreshToken,
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: CryptoJS.enc.Utf8.parse(''),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }
  ).toString(CryptoJS.enc.Utf8);
};
