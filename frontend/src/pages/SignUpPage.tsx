import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCheck, AiFillCheckCircle } from 'react-icons/ai';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../utils/firebase';
import InputProfile from '../components/SignUp/InputProfile';
import { InputProfileProps } from '../types/ComponentPropsType';
import { SignUpPageProps } from '../types/PagePropsType';

export default function SignUpPage({
  email,
  name,
  password,
  passwordConfirm,
  nameMessage,
  emailMessage,
  passwordMessage,
  passwordConfirmMessage,
  isEmail,
  isCheckEmail,
  isName,
  isPassword,
  isPasswordConfirm,
  isSend,
  isOpen,
  imageUrl,
  handleImageChange,
  handleImageDelete,
  onChangeEmail,
  onChangeAuthNum,
  onChangeNickName,
  onChangePassword,
  onChangePasswordConfirm,
  onClickCheckEmailCode,
  onClickSend,
  onClickNext,
  onClickComplete,
}: SignUpPageProps) {
  // const navigate = useNavigate();
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
                onChange={onChangeAuthNum}
                className="card sign-up-page__auth__input"
                type="password"
                disabled={!isEmail}
              />
              {isSend === true ? (
                <button
                  className="card sign-up-page__button"
                  type="button"
                  onClick={onClickCheckEmailCode}
                  disabled={isCheckEmail}
                >
                  인증하기
                </button>
              ) : (
                <button
                  className="card sign-up-page__button"
                  type="button"
                  onClick={onClickSend}
                  disabled={!isEmail}
                >
                  전송
                </button>
              )}
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
                disabled={!isCheckEmail}
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
                disabled={!isName}
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
                disabled={!isPassword}
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
                    <AiFillCheckCircle />
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
              className="card sign-up-favorite-tag-page__next__button"
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
