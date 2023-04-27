import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import EXIF from 'exif-js';
import imageCompression from 'browser-image-compression';

import useViewModel from '../viewmodels/ArticleViewModel';
import { userInfo } from '../atoms/userInfo';
import ModifyArticlePage from '../pages/ModifyArticlePage';

function ModifyArticleContainer() {
  const params = useParams();

  const { getArticle } = useViewModel();
  // 미리보기 이미지 url 저장 배열
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [prevImagePaths, setPrevImagePaths] = useState<Array<string>>([]);
  const [imagePaths, setImagePaths] = useState<Array<string>>([]);
  // 이미지 파일 저장 배열
  const [images, setImages] = useState<Array<File>>([]);
  // 태그 저장 배열
  const [autoTags, setAutoTags] = useState<Array<string>>([]);
  // 카드 내용
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [la, setLa] = useState<string>('');
  const [lo, setLo] = useState<string>('');
  const [loc, setLoc] = useState<string>('서울특별시');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);
  const [isNotAuth, setIsNotAuth] = useState<boolean>(false);
  const [customTags, setCustomTags] = useState<Array<string>>([]);
  const [customTag, setCustomTag] = useState<string>('');
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [isNoTags, setIsNoTags] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    '내부 서버 오류 \n 잠시 후에 다시 시도해주세요.'
  );
  const user = useRecoilValue(userInfo);

  const navigate = useNavigate();

  const {
    uploadImages,
    modifyArticle,
    createAutoTags,
    downloadImages,
    deleteImage,
  } = useViewModel();
  const handleCustomTagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomTag(event.currentTarget.value);
  };

  const handleAutoTagDelete = (idx: number) => {
    const newAutoTags = autoTags;
    newAutoTags.splice(idx, 1);
    setAutoTags([...newAutoTags]);
  };
  const handleCustomTagDelete = (idx: number) => {
    const newCustomTags = customTags;
    newCustomTags.splice(idx, 1);
    setCustomTags([...newCustomTags]);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (isModalOpen && tagInputRef.current) {
      tagInputRef.current.focus();
    }
  }, [isModalOpen]);
  const handleModalClose = () => {
    setCustomTag('');
    setIsModalOpen(false);
  };
  const handlePageMove = () => {
    navigate(`/record/${user.id}`);
  };
  const handleFailModalClose = () => {
    setIsFail(false);
  };
  const handleNoTagsModalClose = () => {
    setErrorMessage('내부서버오류 \n 잠시 후에 다시 시도해주세요,');
    setIsNoTags(false);
  };

  const handleCustomTagAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newCustomTags = customTags;
    newCustomTags.push(customTag);

    setCustomTags([...newCustomTags]);
    setCustomTag('');
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
    setPrevImagePaths(imagePaths);
    setImagePaths([]);
    setImageUrls([]);
    setImages([]);
    setAutoTags([]);
    setCustomTags([]);
    setLoc('');
    setLo('');
    setLa('');
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // 카드 생성 함수
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // 새로고침 방지
    event.preventDefault();
    // 서버에 업로드하는 함수는 여기에
    if (textareaRef.current?.value.length === 0 || images.length === 0) {
      setErrorMessage('사진, 글을 넣어주세요.');
      setIsFail(true);
      return;
    }

    const options = {
      maxSizeMB: 0.2,
      maxWidthORHeight: 640,
      useWebWorker: true,
    };

    await Promise.all(
      prevImagePaths.map((prevImagePath: string) =>
        deleteImage(prevImagePath, user.email)
      )
    );
    try {
      setIsLoading(true);
      const compressedImage: Array<File> = [];
      await Promise.all(
        images.map(async (image: File) => {
          const compressedFile = await imageCompression(image, options);
          compressedImage.push(compressedFile);
        })
      );
      const imgPath = await uploadImages(
        compressedImage,
        'article',
        user.email
      );
      if (imgPath.length === 0) {
        setIsFail(true);
        return;
      }
      const res: any = await modifyArticle({
        area: loc,
        autoTags,
        articleId: params.articleId,
        content: textareaRef.current?.value,
        imgPath: imagePaths.concat(imgPath).join(','),
        lat: la,
        lng: lo,
        tags: customTags,
        userId: user.id,
      });
      if (res.status === 200) {
        setIsSuccess(true);
      } else {
        setIsFail(true);
      }
    } catch (error: any) {
      // console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
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
              setLoc('서울특별시');
            } else if (region === '인천') {
              setLoc('인천광역시');
            } else if (region === '경북') {
              setLoc('경상북도');
            } else if (region === '제주특별자치도') {
              setLoc('제주특별자치도');
            } else if (region === '경기') {
              setLoc('경기도');
            } else if (region === '세종특별자치시') {
              setLoc('세종특별자치시');
            } else if (region === '광주') {
              setLoc('광주광역시');
            } else if (region === '대전') {
              setLoc('대전광역시');
            } else if (region === '울산') {
              setLoc('울산광역시');
            } else if (region === '대구') {
              setLoc('대구광역시');
            } else if (region === '부산') {
              setLoc('부산광역시');
            } else if (region === '충북') {
              setLoc('충청북도');
            } else if (region === '강원') {
              setLoc('강원도');
            } else if (region === '충남') {
              setLoc('충청남도');
            } else if (region === '전북') {
              setLoc('전라북도');
            } else if (region === '경남') {
              setLoc('경상남도');
            } else if (region === '전남') {
              setLoc('전라남도');
            }
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }
    }
  }, [lo]);

  useEffect(() => {
    if (loc) {
      const getTags = async () => {
        setIsLoading(true);
        if (images.length > 0) {
          const res = await createAutoTags(images, loc);
          const newAutoTags: Array<string> = [];
          if (res.length > 0) {
            res.forEach((tag: string) => {
              newAutoTags.push(tag);
            });
          } else {
            setErrorMessage(
              '생성된 태그가 없습니다. \n 다른 사진으로 다시 시도해보세요.'
            );
            setIsNoTags(true);
          }
          setAutoTags([...newAutoTags]);
        }
        setIsLoading(false);
      };
      getTags();
    }
  }, [loc]);
  useEffect(() => {
    const getData = async () => {
      if (params.articleId) {
        const res = await getArticle(params.articleId, user.id);
        if (res.status === 200) {
          if (user.id !== res.data.user.id) {
            setIsNotAuth(true);
          } else {
            const tags: Array<string> = [];
            await Promise.all(
              res.data.tags.map((tag: any) => tags.push(tag.tagName))
            );
            setImagePaths(res.data.imgPath.split(','));
            const newImageUrls = await downloadImages(
              res.data.imgPath.split(',')
            );
            setImageUrls(newImageUrls);
            if (textareaRef.current) {
              textareaRef.current.value = res.data.content;
            }
            setLa(res.data.lat);
            setLo(res.data.lng);
            setLoc(res.data.area);
            setCustomTags(tags);
          }
        }
      }
    };
    getData();
  }, []);
  return (
    <ModifyArticlePage
      isModalOpen={isModalOpen}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isNotAuth={isNotAuth}
      isFail={isFail}
      handleFailModalClose={handleFailModalClose}
      customTag={customTag}
      handleCustomTagInputChange={handleCustomTagInputChange}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      imageUrls={imageUrls}
      handleImageChange={handleImageChange}
      handleImageDelete={handleImageDelete}
      autoTags={autoTags}
      customTags={customTags}
      textareaRef={textareaRef}
      handleSubmit={handleSubmit}
      handleCustomTagAdd={handleCustomTagAdd}
      handleCustomTagDelete={handleCustomTagDelete}
      handleAutoTagDelete={handleAutoTagDelete}
      handlePageMove={handlePageMove}
      handleTextareaChange={handleTextareaChange}
      tagInputRef={tagInputRef}
      errorMessage={errorMessage}
      isNoTags={isNoTags}
      handleNoTagsModalClose={handleNoTagsModalClose}
    />
  );
}

export default ModifyArticleContainer;
