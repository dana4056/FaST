import React from 'react';
import { FindPwdProps } from '../types/PagePropsType';

export default function FindPwdPage({
  email,
  password,
  passwordConfirm,
  emailMessage,
  passwordMessage,
  passwordConfirmMessage,
  isEmail,
  isCheckEmail,
  isPassword,
  isPasswordConfirm,
  isSend,
  onChangeEmail,
  onChangeAuthNum,
  onChangePassword,
  onChangePasswordConfirm,
  onClickCheckEmailCode,
  onClickSend,
  onClickNext,
}: FindPwdProps) {
  return (
    <div>
      <div className="sign-up-page">
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
              <span className="sign-up-page__text">새 비밀번호</span>
            </div>
            <input
              className="card sign-up-page__input"
              type="password"
              placeholder="영어, 숫자 8~15자리"
              onChange={onChangePassword}
              disabled={!isCheckEmail}
            />
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}>
                {passwordMessage}
              </span>
            )}
          </div>
          <div className="sign-up-page__row">
            <div className="sign-up-page__row__text">
              <span className="sign-up-page__text">새 비밀번호 확인</span>
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
                className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>
          <div className="find-pwd-page__row">
            <button
              className="card find-pwd-page__change__button"
              type="button"
              onClick={onClickNext}
            >
              변경하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
