import React, { useState, useEffect, useRef } from 'react';
import cardimg from '../assets/images/photocardimg.jpeg';
import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import { KakaoMapProps } from '../types/ComponentPropsType';
import mappin from '../assets/images/mappin.png';

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
  if (positionData !== undefined) {
    for (let i = 0; i < positionData.length; i += 1) {
      markerDatas.push({
        pointX: positionData[i].lat,
        pointY: positionData[i].lng,
        pointImg: sample1,
      });
    }
  }
  const container = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [kakaoMap, setKakaoMap] = useState<any>(null);

  useEffect(() => {
    // 1. 지도 표시하기
    // const container = document.getElementById('map');

    // console.log('aaaaaaaaaaa', selectOption);
    if (container.current && checkClicked === 'after_click') {
      const options = {
        center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
        level: 9,
      };
      const map = new window.kakao.maps.Map(container.current, options);
      setKakaoMap(map);
    }
  }, [container, checkClicked]);

  // useEffect(() => {
  //   if (!kakaoMap) return;
  // }, [kakaoMap]);

  // useEffect(() => {
  //   if (map) {
  //     map.setCenter(selectOption.center);
  //     map.setLevel(selectOption.level);
  //   }
  // }, [selectOption]);

  // useEffect(() => {
  //   // console.log(window.kakao);
  //   // 2. 마커 찍기
  //   // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
  //   const imageSrc = '/static/media/mappin.e77f3fbc9b915bd5989d.png';
  //   const imageSize = new window.kakao.maps.Size(27, 35); // 마커이미지의 크기입니다
  //   const imageOption = {
  //     offset: new window.kakao.maps.Point(16, 34),
  //     alt: '마커이미지',
  //     shape: 'poly',
  //     coords: '1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33',
  //   };

  //   // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  //   const markerImage = new window.kakao.maps.MarkerImage(
  //     imageSrc,
  //     imageSize,
  //     imageOption
  //   );

  //   for (let i = 0, len = markerDatas.length; i < len; i += 1) {
  //     // 마커가 표시될 위치입니다
  //     const markerPosition = new window.kakao.maps.LatLng(
  //       `${markerDatas[i].pointX}`,
  //       `${markerDatas[i].pointY}`
  //     );

  //     // 마커를 생성합니다
  //     const marker = new window.kakao.maps.Marker({
  //       position: markerPosition,
  //       image: markerImage, // 마커이미지 설정
  //       clickable: true,
  //     });

  //     // 마커가 지도 위에 표시되도록 설정합니다
  //     marker.setMap(map);

  //     // 3. 마커 클릭 시 이미지 띄우기
  //     // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
  //     const iwContent =
  //       '<div className="iwContentContainer" style="border: 8px solid white; border-bottom: 30px solid white; background-color: white">' +
  //       `<img className="iwContentImg" style="width:120px; " src=${markerDatas[i].pointImg} alt='test' />` +
  //       '<div>주소</div>' +
  //       '<div className="iwContentClose" onclick={} title="닫기" />' +
  //       '</div>';
  //     // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  //     const iwRemoveable = true;
  //     // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

  //     // // 마커에 클릭이벤트를 등록합니다
  //     // window.kakao.maps.event.addListener(marker, 'click', function () {
  //     //   // 인포윈도우를 생성합니다
  //     //   const infowindow = new window.kakao.maps.InfoWindow({
  //     //     content: iwContent,
  //     //     removable: iwRemoveable,
  //     //   });

  //     //   // 마커 위에 인포윈도우를 표시합니다
  //     //   infowindow.open(map, marker);
  //     // });

  //     // 커스텀 오버레이가 표시될 위치입니다
  //     const position = new window.kakao.maps.LatLng(
  //       `${markerDatas[i].pointX}`,
  //       `${markerDatas[i].pointY}`
  //     );

  //     // 커스텀 오버레이를 생성합니다
  //     const customOverlay = new window.kakao.maps.CustomOverlay({
  //       map,
  //       position,
  //       content: iwContent,
  //       yAnchor: 1,
  //     });

  //     // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
  //     customOverlay.setMap(null);
  //     window.kakao.maps.event.addListener(marker, 'click', function () {
  //       customOverlay.setMap(map);
  //       console.log('test');
  //       console.log(customOverlay);
  //       console.log(iwContent);
  //     });

  //     // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
  //     const closeOverlay = function () {
  //       customOverlay.setMap(null);
  //     };
  //   }
  // }, [selectOption, markerDatas]);
  return (
    <div
      ref={container}
      id="map"
      style={{
        width: '100%',
        height: '400px',
        // margin: 'auto',
        // borderRadius: '10px',
      }}
    />
  );
}

export default Kakaomap;
