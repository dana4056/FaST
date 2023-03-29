import React from 'react';
import { ModifyPwdProps } from '../types/PagePropsType';

export default function ModifyPwdPage({
  originalPassword,
  password,
  originalPasswordMessage,
  passwordConfirm,
  passwordMessage,
  passwordConfirmMessage,
  isOriginalPassword,
  isPassword,
  isPasswordConfirm,
  onChangeOriginalPassword,
  onChangePassword,
  onChangePasswordConfirm,
  onClickNext,
}: ModifyPwdProps) {
  return (
    <div>
      <div>
        <form className="modify-pwd-page__form">
          <div className="modify-pwd-page__row">
            <div className="modify-pwd-page__row">
              <span className="modify-pwd-page__row__text">기존 비밀번호</span>
            </div>
            <input
              className="card modify-pwd-page__input"
              type="password"
              placeholder="영어, 숫자 8~15자리"
              onChange={onChangeOriginalPassword}
            />
            {originalPassword.length > 0 && (
              <span
                className={`modify-pwd-page__message ${
                  isOriginalPassword ? 'success' : 'error'
                }`}
              >
                {originalPasswordMessage}
              </span>
            )}
          </div>
          <div className="modify-pwd-page__row">
            <div className="modify-pwd-page__row">
              <span className="modify-pwd-page__row__text">새 비밀번호</span>
            </div>
            <input
              className="card modify-pwd-page__input"
              type="password"
              placeholder="영어, 숫자 8~15자리"
              onChange={onChangePassword}
              disabled={!isOriginalPassword}
            />
            {password.length > 0 && (
              <span
                className={`modify-pwd-page__message ${
                  isPassword ? 'success' : 'error'
                }`}
              >
                {passwordMessage}
              </span>
            )}
          </div>
          <div className="modify-pwd-page__row">
            <div className="modify-pwd-page__row">
              <span className="modify-pwd-page__row__text">
                새 비밀번호 확인
              </span>
            </div>
            <input
              className="card modify-pwd-page__input"
              type="password"
              placeholder="영어, 숫자 8~15자리"
              onChange={onChangePasswordConfirm}
              disabled={!isPassword}
            />
            {passwordConfirm.length > 0 && (
              <span
                className={`modify-pwd-page__message ${
                  isPasswordConfirm ? 'success' : 'error'
                }`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>
          <div className="modify-pwd-page__row">
            <button
              className="card modify-pwd-page__change__button"
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
