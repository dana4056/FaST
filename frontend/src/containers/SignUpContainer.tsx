import { ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';
import { storage } from '../utils/firebase';

function SignUpContainer() {
  const navigate = useNavigate();
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
  const onClickSend = () => {
    console.log('사용자 이메일로 인증번호 전송!');
    // 이메일 인증번호 전송 api 연결
    setIsSend(true);
    // eslint-disable-next-line no-alert
    alert('이메일로 인증번호를 전송했습니다 :)');
  };

  // 인증번호 확인
  const onClickCheckEmailCode = () => {
    console.log('이메일 인증번호 확인!');

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
  const onClickNext = () => {
    if (isEmail && isName && isPassword && isPasswordConfirm) {
      console.log('회원가입 api 통신할 때 보낼 데이터 : ');
      console.log(email);
      console.log(name);
      console.log(password);

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
      // setIsOpen(() => true);
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
        isName={isName}
        isPassword={isPassword}
        isPasswordConfirm={isPasswordConfirm}
        isSend={isSend}
        imageUrl={imageUrl}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        onChangeEmail={onChangeEmail}
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
