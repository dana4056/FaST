import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import ModifyPwdPage from '../pages/ModifyPwdPage';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';
import api from '../api/modifyPwd';
import { userInfo } from '../atoms/userInfo';

export default function ModifyPwdContainer() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userInfo);
  // 유효성 검사
  const [isOriginalPassword, setIsOriginalPassword] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // 기존 비밀번호, 비밀번호, 비밀번호 확인
  const [originalPassword, setOriginalPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  // 오류메시지 상태저장
  const [originalPasswordMessage, setOriginalPasswordMessage] =
    useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');

  // 기존 비밀번호
  const onChangeOriginalPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setOriginalPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setOriginalPasswordMessage(
          '숫자+영문자 조합으로 8자리 이상 입력해주세요!'
        );
        setIsOriginalPassword(false);
      } else {
        setOriginalPasswordMessage('올바른 형식의 비밀번호에요 : )');
        setIsOriginalPassword(true);
      }
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

  // 비밀번호 변경 처리
  const onClickNext = async () => {
    if (isOriginalPassword && isPassword && isPasswordConfirm) {
      // 사용자의 새로운 salt
      const salt = createSalt();
      // 사용자의 기존 salt 요청
      const saltRes = await api.getSalt(user.email);
      if (saltRes.status === 200) {
        // 기존 salt로 기존 비밀번호 암호화 처리
        const pwd = createHashedPassword(originalPassword, saltRes.data);
        const newPwd = createHashedPassword(password, salt);
        const res = await api.modifyPwd(user.id, pwd, newPwd, salt);
        if (res === 200) {
          // recoil-persist로 localstorage에 user 정보 저장
          // setuser(res.data);
          navigate('/home');
        }
      }
    }
  };

  const onClickBack = () => {
    navigate(-1);
  };
  return (
    <div className="modify-pwd-page">
      <ModifyPwdPage
        originalPassword={originalPassword}
        password={password}
        originalPasswordMessage={originalPasswordMessage}
        passwordConfirm={passwordConfirm}
        passwordMessage={passwordMessage}
        passwordConfirmMessage={passwordConfirmMessage}
        isOriginalPassword={isOriginalPassword}
        isPassword={isPassword}
        isPasswordConfirm={isPasswordConfirm}
        onChangeOriginalPassword={onChangeOriginalPassword}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        onClickNext={onClickNext}
        onClickBack={onClickBack}
      />
    </div>
  );
}
