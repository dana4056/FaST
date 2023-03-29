import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModifyPwdPage from '../pages/ModifyPwdPage';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';

export default function ModifyPwdContainer() {
  const navigate = useNavigate();

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

  // 변경하기 버튼 클릭 시 관심 태그 설정하러 이동 & 회원가입 api 연결
  const onClickNext = async () => {
    if (isPassword && isPasswordConfirm) {
      console.log('새 비밀번호 통신할 때 보낼 데이터 : ');
      const salt = createSalt();
      console.log(salt);
      const pwd = createHashedPassword(password, salt);
      // console.log(`password : ${password}`); // 비밀번호
      console.log(`암호화된 password : ${pwd}`); // 암호화된 password
      //   const res = await api.findPwd(email, pwd, salt);
      //   if (res === 200) {
      //     // db에 있는 사용자 pk값 저장
      //     navigate('/login');
      //   } else {
      //     alert('비밀번호 찾기에 실패했습니다. 다시 시도해 주세요.');
      //   }
      // }
      // // eslint-disable-next-line no-alert
      // else alert('다시 확인해 주세요 :)');
    }
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
      />
    </div>
  );
}
