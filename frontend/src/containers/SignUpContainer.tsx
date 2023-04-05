import { ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import imageCompression from 'browser-image-compression';
import SignUpPage from '../pages/SignUpPage';
// import { storage } from '../utils/firebase';
import imageApi from '../api/image';
import api from '../api/signUp';
import { createSalt, createHashedPassword } from '../utils/passwordEncryption';
import Header from '../components/Header';

function SignUpContainer() {
  const navigate = useNavigate();
  const [idPk, setIdPk] = useState(Number);
  const [isOpen, setIsOpen] = useState(false);
  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isCheckEmail, setIsCheckEmail] = useState<boolean>(false); // 인증번호 확인
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('profiles/default.jpg');
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

  const [isChecked, setIsChecked] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const tag = [
    [
      {
        tagName: '바다',
        color: 'sign-up-page__tag--6',
        index: 0,
      },
      {
        tagName: '산',
        color: 'sign-up-page__tag--7',
        index: 1,
      },
      {
        tagName: '액티비티',
        color: 'sign-up-page__tag--8',
        index: 2,
      },
    ],
    [
      {
        tagName: '강',
        color: 'sign-up-page__tag--8',
        index: 3,
      },
      {
        tagName: '유적지',
        color: 'sign-up-page__tag--9',
        index: 4,
      },
      {
        tagName: '계곡',
        color: 'sign-up-page__tag--6',
        index: 5,
      },
    ],
    [
      {
        tagName: '호캉스',
        color: 'sign-up-page__tag--9',
        index: 6,
      },
      {
        tagName: '캠핑',
        color: 'sign-up-page__tag--6',
        index: 7,
      },
      {
        tagName: '힐링',
        color: 'sign-up-page__tag--7',
        index: 8,
      },
    ],
    [
      {
        tagName: '배낭여행',
        color: 'sign-up-page__tag--7',
        index: 9,
      },
      {
        tagName: '박물관',
        color: 'sign-up-page__tag--8',
        index: 10,
      },
      {
        tagName: '자전거',
        color: 'sign-up-page__tag--6',
        index: 11,
      },
    ],
    [
      {
        tagName: '등산',
        color: 'sign-up-page__tag--6',
        index: 12,
      },
      {
        tagName: '휴양지',
        color: 'sign-up-page__tag--7',
        index: 13,
      },
      {
        tagName: '도심',
        color: 'sign-up-page__tag--9',
        index: 14,
      },
    ],
  ];
  const [selectedTag, setSelectedTag] = useState<Array<string>>([]);

  // 이미지 입력
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const { files } = event.target;
      const newImages: Array<File> = [];
      const newImageUrls: Array<string> = [];

      // 입력한 파일을 순회하며 state에 추가
      // for (let i = 0; i < files.length; i += 1) {
      //   newImages[i] = files[i];
      //   newImageUrls[i] = URL.createObjectURL(files[i]);
      // }
      const options = {
        maxSizeMB: 0.2,
        maxWidthORHeight: 640,
        useWebWorker: true,
      };
      try {
        const compressedImage = await imageCompression(files[0], options);
        setImage(compressedImage);
        setImageUrl(URL.createObjectURL(compressedImage));
        setImgPath(`profiles/${email}`);
        console.log(`사용자 이미지 입력 : ${imgPath}`);
      } catch (error) {
        console.log(error);
      }
      // 입력 초기화
      // event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };

  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrl('');
    setImage(undefined);
    setImgPath('profiles/default.jpg');
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

  // 사용자가 관심 태그를 선택할 때마다 실행되는 함수
  const onClickTag = (e: number, row: number) => {
    console.log(`관심 태그 선택!!${e}`);
    const favoritTag = tag[row][e].tagName;
    console.log(tag[row][e]);
    const { index } = tag[row][e];
    console.log(index);
    console.log(isChecked[index]);

    if (!isChecked[index]) {
      // 태그가 선택되어 있지 않았다면
      const newIsChecked = [...isChecked];
      newIsChecked[index] = true;
      setIsChecked(newIsChecked);

      const newSelectTag = selectedTag.concat(favoritTag);
      setSelectedTag(newSelectTag);
    } else {
      // 태그가 이미 선택되어 있다면 해당 태그 선택 해제
      const newIsChecked = [...isChecked];
      newIsChecked[index] = false;
      setIsChecked(newIsChecked);

      // 선택된 해당 태그 삭제 후 재할당
      const idx = selectedTag.indexOf(favoritTag);
      console.log(idx);
      setSelectedTag(selectedTag.filter((t) => t !== favoritTag));
    }
  };

  // 다음 버튼 클릭 시 관심 태그 설정하러 이동 & 회원가입 api 연결
  const onClickNext = async () => {
    if (isEmail && isCheckEmail && isName && isPassword && isPasswordConfirm) {
      const salt = createSalt();
      const pwd = createHashedPassword(password, salt);

      if (image === undefined) {
        setImgPath(() => 'profiles/default.jpg');
        const res = await api.signUp(
          email,
          'profiles/default.jpg',
          name,
          pwd,
          salt
        );
        console.log(res);
        if (res.status === 200) {
          // db에 있는 사용자 pk값 저장
          setIdPk(res.data.id);
          setIsOpen(() => true);
        }
        // else if (res.status === 409) {
        //   alert('이미 존재하는 이메일 입니다. 다시 시도해 주세요.');
        // } else {
        //   alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        // }
      } else {
        const imgRes: any = await imageApi.uploadImage(
          image,
          'profile',
          `profile/${email}`,
          email
        );
        if (imgRes.status === 200) {
          setImgPath(() => `profiles/${email}`);
          const res = await api.signUp(
            email,
            `profiles/${email}`,
            name,
            pwd,
            salt
          );
          if (res.status === 200) {
            // db에 있는 사용자 pk값 저장
            setIdPk(res.data.id);

            setIsOpen(() => true);
          } else if (res.status === 409) {
            alert('이미 존재하는 이메일 입니다. 다시 시도해 주세요.');
          } else {
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
          }
        }
      }
    }
    // eslint-disable-next-line no-alert
    else alert('다시 확인해 주세요 :)');
  };

  // 관심 태그 선택까지 모두 마쳤다면
  const onClickComplete = async () => {
    console.log('완료 버튼 클릭!!!');
    if (selectedTag.length === 0) {
      alert('관심 태그를 선택해주세요!');
    }
    const res = await api.registerTag(selectedTag, idPk);

    if (res === 200) {
      navigate('/login');
    }
  };

  return (
    <>
      <Header />
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
        tag={tag}
        selectedTag={selectedTag}
        isChecked={isChecked}
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
        onClickTag={onClickTag}
      />
    </>
  );
}

export default SignUpContainer;
