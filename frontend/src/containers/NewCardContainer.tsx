import React, { useState, useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import EXIF from 'exif-js';

import NewCardPage from '../pages/NewCardPage';
import { TagType } from '../types/TagType';
import useViewModel from '../viewmodels/CardViewModel';
import { userInfo } from '../atoms/userInfo';
import test from '../api/tag';

declare global {
  interface Window {
    kakao: any;
  }
}

function NewCardContainer() {
  // 미리보기 이미지 url 저장 배열
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  // 이미지 파일 저장 배열
  const [images, setImages] = useState<Array<File>>([]);
  // 태그 저장 배열
  const [autoTags, setAutoTags] = useState<Array<TagType>>([]);
  // 카드 내용
  const [description, setDescription] = useState<string>('');
  const [la, setLa] = useState<string>('');
  const [lo, setLo] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customTags, setCustomTags] = useState<Array<TagType>>([]);
  const [customTag, setCustomTag] = useState<string>('');

  const user = useRecoilValue(userInfo);

  const { uploadImages, writeArticle } = useViewModel();
  const handleCustomTagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTag(event.currentTarget.value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setCustomTag('');
    setIsModalOpen(false);
  };

  const handleCustomTagAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newCustomTags = customTags;
    newCustomTags.push({
      className: 'tag-4',
      value: customTag,
    });
    setCustomTags([...newCustomTags]);
    handleModalClose();
  };

  // 이미지 입력
  const handleImageChange = async (event: React.ChangeEvent<any>) => {
    if (event.target.files) {
      const fileList = event.target.files;
      const filesArray: Array<File> = Array.from(fileList);
      if (images.length + filesArray.length > 10) {
        alert('최대 10개의 이미지를 업로드할 수 있습니다.');
        return;
      }
      const newImages: Array<File> = [];
      const newImageUrls: Array<string> = [];

      filesArray.forEach((file: any, i: number) => {
        EXIF.getData(file, () => {
          const meta = EXIF.getAllTags(file);
          if (la.length === 0 && meta && meta.GPSLatitudeRef) {
            if (meta.GPSLatitudeRef === 'S') {
              setLa(
                String(
                  -1 * meta.GPSLatitude[0] +
                    (-60 * meta.GPSLatitude[1] - meta.GPSLatitude[2]) / 3600
                )
              );
            } else {
              setLa(
                String(
                  meta.GPSLatitude[0] +
                    (60 * meta.GPSLatitude[1] + meta.GPSLatitude[2]) / 3600
                )
              );
            }
            if (meta.GPSLongitudeRef === 'W') {
              setLo(
                String(
                  -1 * meta.GPSLongitude[0] +
                    (-60 * meta.GPSLongitude[1] - meta.GPSLongitude[2]) / 3600
                )
              );
            } else {
              setLo(
                String(
                  meta.GPSLongitude[0] +
                    (60 * meta.GPSLongitude[1] + meta.GPSLongitude[2]) / 3600
                )
              );
            }
          }
        });
        newImages[i] = file;
        newImageUrls[i] = URL.createObjectURL(filesArray[i]);
      });

      setImages((prev: Array<File>) => [...prev.concat(newImages)]);
      setImageUrls((prev: Array<string>) => [...prev.concat(newImageUrls)]);

      // 입력 초기화
      event.target.value = ''; // eslint-disable-line no-param-reassign
    }
  };

  // 입력한 이미지 삭제
  const handleImageDelete = () => {
    setImageUrls([]);
    setImages([]);
    setAutoTags([]);
  };

  // 내용 변화를 감지
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.currentTarget.value);
  };
  // 카드 생성 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();
    // 서버에 업로드하는 함수는 여기에
    // imageUrls.map((url: string) => getLocation(url));

    // const uploadPaths = await uploadImages(images);
    // const res = await writeArticle({
    //   imagePath: uploadPaths.join(),
    //   content: description,
    //   tags,
    //   userId: user.id,
    // });
  };

  useEffect(() => {
    const postData = async (tt: string) => {
      const res = await test(images[0], tt);
      console.log(res.data[0]);
    };
    if (
      la.length !== 0 &&
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.services
    ) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const coord = new window.kakao.maps.LatLng(la, lo);
      if (geocoder && coord) {
        const callback = function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const region = result[0].address.region_1depth_name;
            if (region === '서울') {
              postData('서울특별시');
            } else if (region === '인천') {
              postData('인천광역시');
            }
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }
    }
  }, [la]);
  return (
    <NewCardPage
      isModalOpen={isModalOpen}
      isLoading={isLoading}
      customTag={customTag}
      handleCustomTagInputChange={handleCustomTagInputChange}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      imageUrls={imageUrls}
      handleImageChange={handleImageChange}
      handleImageDelete={handleImageDelete}
      autoTags={autoTags}
      customTags={customTags}
      description={description}
      handleDescriptionChange={handleDescriptionChange}
      handleSubmit={handleSubmit}
      handleCustomTagAdd={handleCustomTagAdd}
    />
  );
}

export default NewCardContainer;
