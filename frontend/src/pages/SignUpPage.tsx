import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCheck, AiFillCamera } from 'react-icons/ai';
import InputProfile from '../components/SignUp/InputProfile';
import { InputProfileProps } from '../types/ComponentPropsType';

export default function SignUpPage({
  imageUrl,
  handleImageChange,
  handleImageDelete,
}: InputProfileProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
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
        color: 'sign-up-favorite-tag-page__tag6',
        index: 0,
      },
      {
        tagName: '산',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 1,
      },
      {
        tagName: '액티비티',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 2,
      },
    ],
    [
      {
        tagName: '강',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 3,
      },
      {
        tagName: '유적지',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 4,
      },
      {
        tagName: '계곡',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 5,
      },
    ],
    [
      {
        tagName: '호캉스',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 6,
      },
      {
        tagName: '캠핑',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 7,
      },
      {
        tagName: '힐링',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 8,
      },
    ],
    [
      {
        tagName: '배낭여행',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 9,
      },
      {
        tagName: '박물관',
        color: 'sign-up-favorite-tag-page__tag8',
        index: 10,
      },
      {
        tagName: '자전거',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 11,
      },
    ],
    [
      {
        tagName: '등산',
        color: 'sign-up-favorite-tag-page__tag6',
        index: 12,
      },
      {
        tagName: '휴양지',
        color: 'sign-up-favorite-tag-page__tag7',
        index: 13,
      },
      {
        tagName: '도심',
        color: 'sign-up-favorite-tag-page__tag9',
        index: 14,
      },
    ],
  ];
  const [selectedTag, setSelectedTag] = useState([]);

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

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  // const router = useRouter();
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
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
        );
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

  // 다음 버튼 클릭 시 관심 태그 설정하러 이동
  const onClickNext = () => {
    setIsOpen(() => true);
  };

  // 회원가입 api 통신
  const onClickComplete = () => {
    console.log('완료 버튼 클릭 + 회원가입 통신 처리하기 !!!');
    navigate('/login');
  };

  // 사용자가 관심 태그를 선택할 때마다 실행되는 함수
  const onClickTag = (e: number) => {
    console.log(`관심 태그 선택!!${e}`);
    const idx = e;
  };

  useEffect(() => {
    console.log('changed!');
  }, [isChecked]);

  return (
    <div className="sign-up-wide-page">
      <div
        className="sign-up-wide-page__wrapper"
        style={isOpen ? { transform: 'translateX(-100%)' } : {}}
      >
        <div className="sign-up-page">
          {/* <div className="sign-up-page__row"> */}
          {/* <div className="sign-up-page__image__container"> */}
          <InputProfile
            imageUrl={imageUrl}
            handleImageChange={handleImageChange}
            handleImageDelete={handleImageDelete}
          />
          {/* <BsPersonCircle className="sign-up-page__image" />
              <AiFillCamera className="sign-up-page__camera__image" /> */}
          {/* </div> */}
          {/* </div> */}
          <form className="sign-up-page">
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <span className="sign-up-page__text">이메일</span>
              </div>
              <input
                placeholder="example@email.com"
                className="card sign-up-page__input"
                type="email"
                onChange={onChangeEmail}
              />
              {email.length > 0 && (
                <span className={`message ${isEmail ? 'success' : 'error'}`}>
                  {emailMessage}
                </span>
              )}
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <span className="sign-up-page__text">인증번호</span>
              </div>
            </div>
            <div className="sign-up-page__row">
              <input
                className="card sign-up-page__auth__input"
                type="password"
              />
              <button className="card sign-up-page__button" type="button">
                인증하기
              </button>
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <span className="sign-up-page__text">닉네임</span>
              </div>
              <input
                className="card sign-up-page__input"
                type="text"
                placeholder="중복 불가능, 1~10자리"
                onChange={onChangeNickName}
              />
              {name.length > 0 && (
                <span className={`message ${isName ? 'success' : 'error'}`}>
                  {nameMessage}
                </span>
              )}
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <span className="sign-up-page__text">비밀번호</span>
              </div>
              <input
                className="card sign-up-page__input"
                type="password"
                placeholder="영어, 숫자 8~15자리"
                onChange={onChangePassword}
              />
              {password.length > 0 && (
                <span className={`message ${isPassword ? 'success' : 'error'}`}>
                  {passwordMessage}
                </span>
              )}
            </div>
            <div className="sign-up-page__row">
              <div className="sign-up-page__row__text">
                <span className="sign-up-page__text">비밀번호 확인</span>
              </div>
              <input
                className="card sign-up-page__input"
                type="password"
                placeholder="영어, 숫자 8~15자리"
                onChange={onChangePasswordConfirm}
              />
              {passwordConfirm.length > 0 && (
                <span
                  className={`message ${
                    isPasswordConfirm ? 'success' : 'error'
                  }`}
                >
                  {passwordConfirmMessage}
                </span>
              )}
            </div>
            <div className="sign-up-page__row__next">
              <button
                className="card sign-up-page__next__button"
                type="button"
                onClick={onClickNext}
              >
                다음
              </button>
            </div>
          </form>
        </div>
        {/* ========= 관심 태그 ========= */}
        <div className="sign-up-favorite-tag-page">
          <div className="sign-up-favorite-tag-page__row">
            <span className="sign-up-favorite-tag-page__title">관심 태그</span>
            <div className="sign-up-favorite-tag-page__container">
              <div className="sign-up-favorite-tag-page__row">
                {tag[0].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[1].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[2].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[3].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-favorite-tag-page__row">
                {tag[4].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={item.color}
                    type="button"
                    onClick={() => onClickTag(item.index)}
                  >
                    {item.tagName}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sign-up-page__row__next">
            <button
              className="card sign-up-page__next__button"
              type="button"
              onClick={onClickComplete}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
