import { ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import { storage } from '../utils/firebase';
import api from '../api/signUp';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';

function SignUpContainer() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isCheckEmail, setIsCheckEmail] = useState<boolean>(false); // 인증번호 확인
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  // 인증번호 전송 및 인증하기 버튼 활성화
  const [isSend, setIsSend] = useState(false);

  // 이름, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState<string>('');
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

  // 미리보기 이미지 url 저장 배열
  const [imageUrl, setImageUrl] = useState<string>('');
  // 이미지 파일 저장 배열
  const [image, setImage] = useState<File>();

  // 이미지 입력
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const { files } = event.target;
      const newImages: Array<File> = [];
      const newImageUrls: Array<string> = [];

      // 입력한 파일을 순회하며 state에 추가
      for (let i = 0; i < files.length; i += 1) {
        newImages[i] = files[i];
        newImageUrls[i] = URL.createObjectURL(files[i]);
      }
      setImage(newImages[0]);
      setImageUrl(newImageUrls[0]);

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };
  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrl('');
    setImage(undefined);
  };

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
  // 닉네임
  const onChangeNickName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      if (e.target.value.length <= 1 || e.target.value.length > 10) {
        setNameMessage('1글자 이상 11글자 미만으로 입력해주세요.');
        setIsName(false);
      } else {
        setNameMessage('올바른 닉네임 형식입니다 :)');
        setIsName(true);
      }
    },
    []
  );

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
    if (isEmail && isCheckEmail && isName && isPassword && isPasswordConfirm) {
      console.log('회원가입 api 통신할 때 보낼 데이터 : ');
      const imgPath = `profiles/${email}`;
      const salt = createSalt();
      const pwd = createHashedPassword(password, salt);
      console.log(`email : ${email}`); // 이메일
      console.log(`nickname : ${name}`); // 닉네임
      console.log(`password : ${password}`); // 비밀번호
      console.log(`암호화된 password : ${pwd}`); // 암호화된 password
      const status = await api.signUp(email, imgPath, name, pwd, salt);

      if (status === 200) {
        // 파이어베이스에 사용자 프로필 사진 등록
        const uploadImage = async (img: File | undefined) => {
          if (img === undefined) return;
          const result = await uploadBytes(
            ref(storage, `profiles/${email}`),
            img
          );
          console.log(result);
        };
        uploadImage(image);
        setIsOpen(() => true);
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
      }
    }
    // eslint-disable-next-line no-alert
    else alert('다시 확인해 주세요 :)');
  };

  const onClickComplete = () => {
    console.log('완료 버튼 클릭!!!');
    navigate('/login');
  };

  return (
    <div className="sign-up-page">
      <SignUpPage
        email={email}
        name={name}
        password={password}
        passwordConfirm={passwordConfirm}
        nameMessage={nameMessage}
        emailMessage={emailMessage}
        passwordMessage={passwordMessage}
        passwordConfirmMessage={passwordConfirmMessage}
        isEmail={isEmail}
        isCheckEmail={isCheckEmail}
        isName={isName}
        isPassword={isPassword}
        isPasswordConfirm={isPasswordConfirm}
        isSend={isSend}
        isOpen={isOpen}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        onChangeEmail={onChangeEmail}
        onChangeAuthNum={onChangeAuthNum}
        onChangeNickName={onChangeNickName}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        onClickCheckEmailCode={onClickCheckEmailCode}
        onClickSend={onClickSend}
        onClickNext={onClickNext}
        onClickComplete={onClickComplete}
      />
    </div>
  );
}

export default SignUpContainer;
