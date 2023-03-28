import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FindPwdPage from '../pages/FindPwdPage';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';
import api from '../api/findPwd';
import Header from '../components/Header';

export default function FindPwdContainer() {
  const navigate = useNavigate();
  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isCheckEmail, setIsCheckEmail] = useState<boolean>(false); // 인증번호 확인
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // 인증번호 전송 및 인증하기 버튼 활성화
  const [isSend, setIsSend] = useState(false);

  // 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [auth, setAuth] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  // 오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  // 사용자 이메일로 인증번호 전송
  const onClickSend = async () => {
    console.log('사용자 이메일로 인증번호 전송!');
    if (isEmail) alert('이메일로 인증번호를 전송했습니다 :)');
    setIsSend(true);
    // 이메일 인증번호 전송 api 연결
    const status = await api.sendEmail(email);
    if (status === 200) {
      console.log('인증번호 전송 성공!');
    } else {
      alert('인증번호 전송에 실패했습니다.');
    }
    console.log(status);
  };

  // 인증번호 확인
  const onClickCheckEmailCode = async () => {
    console.log('이메일 인증번호 확인 중!');
    const status = await api.checkEmail(email, auth);
    if (status === 200) {
      alert('인증번호 확인이 완료됐습니다 :)');
    } else {
      alert('인증번호 확인에 실패했습니다.');
    }
    console.log(status);
    setIsCheckEmail(true);
  };

  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        // eslint-disable-next-line max-len
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('이메일 형식이 틀렸습니다! 다시 확인해주세요 ㅜ ㅜ');
        setIsEmail(false);
      } else {
        setEmailMessage('올바른 이메일 형식이에요 : )');
        setIsEmail(true);
      }
    },
    []
  );

  // 인증번호
  const onChangeAuthNum = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuth(e.target.value);
    },
    []
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!');
        setIsPassword(false);
      } else {
        setPasswordMessage('안전한 비밀번호에요 : )');
        setIsPassword(true);
      }
    },
    []
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // 다음 버튼 클릭 시 관심 태그 설정하러 이동 & 회원가입 api 연결
  const onClickNext = async () => {
    if (isEmail && isCheckEmail && isPassword && isPasswordConfirm) {
      console.log('새 비밀번호 통신할 때 보낼 데이터 : ');
      const salt = createSalt();
      console.log(salt);
      const pwd = createHashedPassword(password, salt);
      console.log(`email : ${email}`); // 이메일
      // console.log(`password : ${password}`); // 비밀번호
      console.log(`암호화된 password : ${pwd}`); // 암호화된 password
      const res = await api.findPwd(email, pwd, salt);
      if (res === 200) {
        // db에 있는 사용자 pk값 저장
        navigate('/login');
      } else {
        alert('비밀번호 찾기에 실패했습니다. 다시 시도해 주세요.');
      }
    }
    // eslint-disable-next-line no-alert
    else alert('다시 확인해 주세요 :)');
  };
  return (
    <>
      <Header />
      <div className="find-pwd-page">
        <FindPwdPage
          email={email}
          password={password}
          passwordConfirm={passwordConfirm}
          emailMessage={emailMessage}
          passwordMessage={passwordMessage}
          passwordConfirmMessage={passwordConfirmMessage}
          isEmail={isEmail}
          isCheckEmail={isCheckEmail}
          isPassword={isPassword}
          isPasswordConfirm={isPasswordConfirm}
          isSend={isSend}
          onChangeEmail={onChangeEmail}
          onChangeAuthNum={onChangeAuthNum}
          onChangePassword={onChangePassword}
          onChangePasswordConfirm={onChangePasswordConfirm}
          onClickCheckEmailCode={onClickCheckEmailCode}
          onClickSend={onClickSend}
          onClickNext={onClickNext}
        />
      </div>
    </>
  );
}
