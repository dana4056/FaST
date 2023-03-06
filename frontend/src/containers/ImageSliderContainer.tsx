import React, { useState, useEffect, useRef } from 'react';

import ImageSlider from '../components/ImageSlider';
import { ImageSliderContainerProps } from '../types/ComponentPropsType';

function ImageSliderContainer({ imageUrls }: ImageSliderContainerProps) {
  // 이미지 가로 길이를 구하기 위한 ref
  const imageRef = useRef<HTMLDivElement>(null);
  // 이미지 가로 길이
  const [width, setWidth] = useState<number>(0);
  // 드래그 시작 마우스 X 좌표
  const [startX, setStartX] = useState<number>(0);
  // 얼마만큼 이동할지
  const [transX, setTransX] = useState<number>(0);

  const [imageIndex, setImageIndex] = useState<number>(0);

  // 드래그하기 위해 터치 시 시작 좌표 설정
  const onTouchDown = (event: React.TouchEvent<HTMLElement>) => {
    setStartX(event.touches[0].clientX);
  };

  // 왼쪽 이미지 보기
  const handleImageLeft = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  };

  // 오른쪽 이미지 보기
  const handleImageRight = () => {
    if (imageIndex < imageUrls.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  // 드래그한 후에 마우스를 뗄 때에 어떻게 이동시킬지
  const onTouchUp = () => {
    // transX는 현재 좌표 - 시작 좌표
    // 음수면 오른쪽으로 넘기기
    // transX가 이미지 가로길이의 절반을 넘어가면 넘김
    if (imageIndex >= 0 && transX < (-1 * width) / 2) {
      handleImageRight();
    }
    // 양수면 왼쪽으로 넘기기
    if (imageIndex <= imageUrls.length - 1 && transX > width / 2) {
      handleImageLeft();
    }
    // 드래그 후 transX를 0으로 초기화
    setTransX(0);
  };

  // 드래그하면서 transX의 값 변경
  const handleTouchMove = (event: React.TouchEvent<HTMLElement>) => {
    // 현재 터치 중인 x좌표 - 시작 x좌표
    setTransX(event.touches[0].clientX - startX);
  };

  // 맨 처음 렌더링했을때 width 초기화
  useEffect(() => {
    if (imageRef.current !== null) {
      setWidth(imageRef.current.clientWidth);
    }
  }, []);

  return (
    <ImageSlider
      imageRef={imageRef}
      width={width}
      transX={transX}
      imageUrls={imageUrls}
      imageIndex={imageIndex}
      handleImageLeft={handleImageLeft}
      handleImageRight={handleImageRight}
      onTouchDown={onTouchDown}
      onTouchUp={onTouchUp}
      handleTouchMove={handleTouchMove}
    />
  );
}

export default ImageSliderContainer;
