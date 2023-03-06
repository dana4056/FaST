import React from 'react';

import { InputPhotoProps } from '../../types/ComponentPropsType';
import ImageSliderContainer from '../../containers/ImageSliderContainer';
import { ReactComponent as Camera } from '../../assets/images/camera.svg';

function InputPhoto({
  imageUrls,
  handleImageChange,
  handleImageDelete,
}: InputPhotoProps) {
  return (
    <div className="input-photo card">
      <label htmlFor="input-photo" className="input-photo__label">
        {imageUrls.length !== 0 ? (
          <ImageSliderContainer imageUrls={imageUrls} />
        ) : (
          <div className="input-photo__content">
            <Camera />
            <div className="input-photo__text">사진을 추가하세요</div>
          </div>
        )}
        <input
          type="file"
          className="input-photo__file"
          id="input-photo"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </label>
      {imageUrls.length === 0 ? null : (
        <div className="input-photo__row">
          <button
            type="button"
            onClick={handleImageDelete}
            className="input-photo__button"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  );
}

export default InputPhoto;
