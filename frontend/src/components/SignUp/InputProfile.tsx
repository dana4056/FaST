import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineCheck, AiFillCamera } from 'react-icons/ai';
import { InputProfileProps } from '../../types/ComponentPropsType';

function InputProfile({
  imageUrl,
  handleImageChange,
  handleImageDelete,
}: InputProfileProps) {
  return (
    <div className="input-profile">
      <label htmlFor="input-profile" className="input-profile__label">
        {imageUrl.length !== 0 ? (
          <img
            className="input-profile__img"
            src={imageUrl}
            alt="profile_img"
          />
        ) : (
          <div className="input-profile__content">
            <BsPersonCircle className="sign-up-page__image" />
            <div className="input-profile__text">프로필 사진 선택</div>
            {/* <AiFillCamera className="sign-up-page__camera__image" /> */}
          </div>
        )}
        <input
          type="file"
          className="input-profile__file"
          id="input-profile"
          accept="image/*"
          onChange={handleImageChange}
        />
      </label>
      {imageUrl.length === 0 ? null : (
        <div className="input-profile__row">
          <button
            type="button"
            onClick={handleImageDelete}
            className="input-profile__button"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  );
}

export default InputProfile;
