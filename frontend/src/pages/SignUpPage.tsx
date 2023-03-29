import React, { useEffect } from 'react';
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import InputProfile from '../components/SignUp/InputProfile';
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
  tag,
  selectedTag,
  isChecked,
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
  onClickTag,
}: SignUpPageProps) {
  useEffect(() => {
    console.log(selectedTag);
  }, [selectedTag]);

  return (
    <div className="sign-up-page">
      <div
        className="sign-up-page__wrapper"
        style={isOpen ? { transform: 'translateX(-100%)' } : {}}
      >
        <form className="sign-up-page__form">
          <div className="sign-up-page__row">
            <InputProfile
              imageUrl={imageUrl}
              handleImageChange={handleImageChange}
              handleImageDelete={handleImageDelete}
            />
          </div>
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
              <span
                className={`sign-up-page__message ${
                  isEmail ? 'success' : 'error'
                }`}
              >
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
              className="card sign-up-page__input--auth"
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
              <span
                className={`sign-up-page__message ${
                  isName ? 'success' : 'error'
                }`}
              >
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
              <span
                className={`sign-up-page__message ${
                  isPassword ? 'success' : 'error'
                }`}
              >
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
                className={`sign-up-page__message ${
                  isPasswordConfirm ? 'success' : 'error'
                }`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>
          <div className="sign-up-page__row">
            <button
              className="card sign-up-page__button"
              type="button"
              onClick={onClickNext}
            >
              다음
            </button>
          </div>
        </form>
        {/* ========= 관심 태그 ========= */}
        <div className="sign-up-page__tag-form">
          <div className="sign-up-page__row">
            <span className="sign-up-page__title">관심 태그</span>
          </div>
          <div className="sign-up-page__row">
            <div className="sign-up-page__tag-container">
              <div className="sign-up-page__tag-row">
                {tag[0].map((item: any, i: number) => (
                  <button
                    key={item.tagName}
                    className={`${item.color} tag card`}
                    type="button"
                    onClick={() => onClickTag(i, 0)}
                  >
                    {isChecked[item.index] ? (
                      // eslint-disable-next-line max-len
                      <AiFillCheckCircle className="sign-up-page__check" />
                    ) : null}
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-page__tag-row">
                {tag[1].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={`${item.color} tag card`}
                    type="button"
                    onClick={() => onClickTag(i, 1)}
                  >
                    {isChecked[item.index] ? (
                      // eslint-disable-next-line max-len
                      <AiFillCheckCircle className="sign-up-page__check" />
                    ) : null}
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-page__tag-row">
                {tag[2].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={`${item.color} tag card`}
                    type="button"
                    onClick={() => onClickTag(i, 2)}
                  >
                    {isChecked[item.index] ? (
                      <AiFillCheckCircle className="sign-up-page__check" />
                    ) : null}
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-page__tag-row">
                {tag[3].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={`${item.color} tag card`}
                    type="button"
                    onClick={() => onClickTag(i, 3)}
                  >
                    {isChecked[item.index] ? (
                      <AiFillCheckCircle className="sign-up-page__check" />
                    ) : null}
                    {item.tagName}
                  </button>
                ))}
              </div>
              <div className="sign-up-page__tag-row">
                {tag[4].map((item, i: number) => (
                  <button
                    key={item.tagName}
                    className={`${item.color} tag card`}
                    type="button"
                    onClick={() => onClickTag(i, 4)}
                  >
                    {isChecked[item.index] ? (
                      <AiFillCheckCircle className="sign-up-page__check" />
                    ) : null}
                    {item.tagName}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sign-up-page__row">
            <button
              className="card sign-up-page__button"
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
