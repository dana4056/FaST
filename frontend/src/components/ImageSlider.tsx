import React from 'react';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import { MdArrowForward } from '@react-icons/all-files/md/MdArrowForward';

import { ImageSliderProps } from '../types/ComponentPropsType';

function ImageSlider({
  imageRef,
  width,
  transX,
  imageUrls,
  imageIndex,
  handleImageLeft,
  handleImageRight,
  onTouchDown,
  onTouchUp,
  handleTouchMove,
}: ImageSliderProps) {
  return (
    <div className="image-slider">
      <button
        type="button"
        className="image-slider__control transparent-button"
        onClick={handleImageLeft}
      >
        <MdArrowBack />
      </button>
      <div className="image-slider__container">
        <div
          ref={imageRef}
          className="image-slider__images"
          role="presentation"
          style={{
            transform: `translateX(${-1 * imageIndex * width + transX}px)`,
          }}
          onTouchStart={onTouchDown}
          onTouchEnd={onTouchUp}
          onTouchMove={handleTouchMove}
        >
          {imageUrls.map((imageUrl: string) => (
            <img
              src={imageUrl}
              key={imageUrl}
              className="image-slider__image"
              alt="sample"
            />
          ))}
        </div>
      </div>
      <button
        type="button"
        className="image-slider__control transparent-button"
        onClick={handleImageRight}
      >
        <MdArrowForward />
      </button>
    </div>
  );
}

export default ImageSlider;
