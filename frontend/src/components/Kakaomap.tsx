import React, { useState, useEffect } from 'react';
import cardimg from '../assets/images/photocardimg.jpeg';
import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';

declare global {
  interface Window {
    kakao: any;
  }
}

function Kakaomap() {
  const markerDatas = [
    {
      pointX: 37.566826,
      pointY: 126.9786567,
      pointImg: cardimg,
    },
    {
      pointX: 37.545926,
      pointY: 126.9786567,
      pointImg: sample1,
    },
    {
      pointX: 37.525926,
      pointY: 126.9586567,
      pointImg: sample2,
    },
    {
      pointX: 37.485926,
      pointY: 126.9586567,
      pointImg: cardimg,
    },
  ];

  useEffect(() => {
    // 1. 지도 표시하기
    const container = document.getElementById('map');
    const options = {
      // 서울 클릭 시
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 9,
    };
    const map = new window.kakao.maps.Map(container, options);

    // 2. 마커 찍기
    // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
    const imageSrc = 'https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png';
    const imageSize = new window.kakao.maps.Size(32, 35); // 마커이미지의 크기입니다
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
      marker.setMap(map);

      // 3. 마커 클릭 시 이미지 띄우기
      // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
      const iwContent = `<img style="width:150px" src=${markerDatas[i].pointImg} alt='test' />`;
      // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      const iwRemoveable = true;
      // removeable 속성을 true 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      // 마커에 클릭이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', function () {
        // 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커 위에 인포윈도우를 표시합니다
        infowindow.open(map, marker);
      });
    }
  }, []);
  return (
    <div>
      <div
        id="map"
        style={{
          width: '100%',
          height: '400px',
          margin: 'auto',
          borderRadius: '10px',
        }}
      />
    </div>
  );
}

export default Kakaomap;
