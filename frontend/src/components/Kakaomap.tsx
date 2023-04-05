import React, { useState, useEffect, useRef } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../utils/firebase';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import mappin from '../assets/images/mappin.png';
import flag from '../assets/images/flag.png';
import pin2 from '../assets/images/pin2.png';
import pin3 from '../assets/images/pin3.png';

import pin4 from '../assets/images/pin4.png';
import pin5 from '../assets/images/pin5.png';
import kakaomappin from '../assets/images/kakaomappin.png';
import kakaomappin2 from '../assets/images/kakaomapppin2.png';

declare global {
  interface Window {
    kakao: any;
  }
}

export interface PinType {
  pointX: number;
  pointY: number;
  pointImg: any;
}

function Kakaomap({ selectOption, positionData, checkClicked }: any) {
  const markerDatas: PinType[] = [];
  const [imageUrl, setImageUrl] = useState<string>(sample2);
  if (positionData !== undefined) {
    console.log(positionData[0]);
    for (let i = 0; i < positionData.length; i += 1) {
      const getImage = async () => {
        const imageRef = ref(storage, positionData[i].imgPath);
        const ret = await getDownloadURL(imageRef);
        setImageUrl(ret);
      };
      getImage();
      markerDatas.push({
        pointX: positionData[i].lat,
        pointY: positionData[i].lng,
        // pointImg, imageUrl,
        pointImg: sample2,
      });
    }
  }
  const container = useRef<HTMLDivElement>(null);
  const [kakaoMap, setKakaoMap] = useState<any>(null);

  useEffect(() => {
    if (container.current && checkClicked === 'after_click') {
      const options = {
        center: new window.kakao.maps.LatLng(
          selectOption.center.Ma,
          selectOption.center.La
        ),
        level: selectOption.level,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      map.relayout();
      setKakaoMap(map);
    }
  }, [container, checkClicked, selectOption]);
  useEffect(() => {
    // 2. 마커 찍기
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    console.log(kakaomappin);
    if (kakaoMap) {
      // const imageSrc = '/static/media/flag.9a05ea6e2fc27aed904d.png';
      // const imageSrc = '/static/media/pin2.7295d41ad48ac72fe225.png';
      // const imageSrc = '/static/media/pin3.e2790ebf2839a776235d.png';
      const imageSrc = '/static/media/kakaomappin.e5e2f1a6ce9b49cbeaf9.png';
      // const imageSrc = '/static/media/kakaomapppin2.7e5c5b4ffb8055c94145.png';
      // const imageSrc = '/static/media/pin5.090db1df04fe6172dff5.png';

      const imageSize = new window.kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
      const imageOption = {
        offset: new window.kakao.maps.Point(16, 34),
        alt: '마커이미지',
        shape: 'poly',
        coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
      };
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      for (let i = 0, len = markerDatas.length; i < len; i += 1) {
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          `${markerDatas[i].pointX}`,
          `${markerDatas[i].pointY}`
        );
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커이미지 설정
          clickable: true,
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(kakaoMap);
        // 3. 마커 클릭 시 이미지 띄우기
        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다

        const iwContent =
          '<div className="iwContentContainer" style="border: 8px solid white; border-bottom: 30px solid white; background-color: white">' +
          `<img className="iwContentImg" style="width:120px; " src=${markerDatas[i].pointImg} alt='test' />` +
          '<div>주소</div>' +
          '</div>';

        // 커스텀 오버레이가 표시될 위치입니다
        const position = new window.kakao.maps.LatLng(
          `${markerDatas[i].pointX}`,
          `${markerDatas[i].pointY}`
        );
        // 커스텀 오버레이를 생성합니다
        const customOverlay = new window.kakao.maps.CustomOverlay({
          kakaoMap,
          position,
          content: iwContent,
          yAnchor: 1,
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        window.kakao.maps.event.addListener(marker, 'click', function () {
          customOverlay.setMap(kakaoMap);
        });

        // 지도를 클릭했을 때 커스텀 오버레이를 닫습니다.
        window.kakao.maps.event.addListener(kakaoMap, 'click', function () {
          customOverlay.setMap(null);
          console.log(customOverlay);
        });
      }
    }
  }, [selectOption, markerDatas]);
  return (
    <div>
      <div
        id="map"
        ref={container}
        style={{
          width: '100%',
          height: '400px',
          margin: 'auto',
          borderRadius: '10px',
        }}
      />
      <img className="mappin" src={kakaomappin} alt="aa" />
      <img className="mappin" src={kakaomappin2} alt="aa" />
      <img className="mappin" src={pin3} alt="aa" />
      <img className="mappin" src={pin4} alt="aa" />
      <img className="mappin" src={pin5} alt="aa" />
    </div>
  );
}

export default Kakaomap;
