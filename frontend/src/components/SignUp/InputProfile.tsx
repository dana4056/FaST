import React from 'react';
import { CgProfile } from '@react-icons/all-files/cg/CgProfile';
import { AiOutlineCamera } from '@react-icons/all-files/ai/AiOutlineCamera';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
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
          <div className="input-profile__content">
            <img
              className="input-profile__img"
              src={imageUrl}
              alt="profile_img"
            />
            <button
              type="button"
              onClick={handleImageDelete}
              className="input-profile__text card"
            >
              초기화
            </button>
          </div>
        ) : (
          <div className="input-profile__content">
            <CgProfile />
            <div className="input-profile__text card">프로필 사진 선택</div>
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
    </div>
  );
}

export default InputProfile;
