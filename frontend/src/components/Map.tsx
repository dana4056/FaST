import React, { useState } from 'react';

import koreamap from '../assets/images/koreamap.png';
import Kakaomap from './Kakaomap';

function Map() {
  const cntData = {
    seoul_cnt: 4,
    gyeonggi_cnt: 1,
    incheon_cnt: 2,
    sejong_cnt: 5,
    gangwon_cnt: 3,
    daejeon_cnt: 6,
    daegu_cnt: 2,
    chungcheongbuk_cnt: 1,
    chungcheongnam_cnt: 4,
    jeollabuk_cnt: 2,
    jeollanam_cnt: 1,
    gwangju_cnt: 5,
    gyeongsangbuk_cnt: 3,
    gyeongsangnam_cnt: 6,
    ulsan_cnt: 1,
    busan_cnt: 2,
    jeju_cnt: 0,
    ulleungdo_cnt: 3,
    dokdo_cnt: 5,
  };

  const seoulColor = `color${cntData.seoul_cnt}`;
  const gyeonggiColor = `color${cntData.gyeonggi_cnt}`;
  const incheonColor = `color${cntData.incheon_cnt}`;
  const sejongColor = `color${cntData.sejong_cnt}`;
  const gangwonColor = `color${cntData.gangwon_cnt}`;
  const daejeonColor = `color${cntData.daejeon_cnt}`;
  const daeguColor = `color${cntData.daegu_cnt}`;
  const chungcheongbukColor = `color${cntData.chungcheongbuk_cnt}`;
  const chungcheongnamColor = `color${cntData.chungcheongnam_cnt}`;
  const jeollabukColor = `color${cntData.jeollabuk_cnt}`;
  const jeollanamColor = `color${cntData.jeollanam_cnt}`;
  const gwangjuColor = `color${cntData.gwangju_cnt}`;
  const gyeongsangbukColor = `color${cntData.gyeongsangbuk_cnt}`;
  const gyeongsangnamColor = `color${cntData.gyeongsangnam_cnt}`;
  const ulsanColor = `color${cntData.ulsan_cnt}`;
  const busanColor = `color${cntData.busan_cnt}`;
  const jejuColor = `color${cntData.jeju_cnt}`;
  const ulleungdoColor = `color${cntData.ulleungdo_cnt}`;
  const dokdoColor = `color${cntData.dokdo_cnt}`;

  const [clickGangwon, setClickGangwon] = useState(false);

  return (
    <div className="koreamap">
      <div className="total__map">
        <img src={koreamap} alt="koreamap" className="base__map" />
        <div className="gyeonggi">
          <div className="gyeonggi_back">
            <div className={gyeonggiColor}>
              <button type="button">경기도</button>
            </div>
          </div>
        </div>
        <div className="gangwon">
          <div className="gangwon_back">
            <div className={gangwonColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="seoul">
          <div className="seoul_back">
            <div className={seoulColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="incheon">
          <div className="incheon_back">
            <div className={incheonColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="chungcheongnam">
          <div className="chungcheongnam_back">
            <div className={chungcheongnamColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="jeollabuk">
          <div className="jeollabuk_back">
            <div className={jeollabukColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="jeollanam">
          <div className="jeollanam_back">
            <div className={jeollanamColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="gwangju">
          <div className="gwangju_back">
            <div className={gwangjuColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="chungcheongbuk">
          <div className="chungcheongbuk_back">
            <div className={chungcheongbukColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="sejong">
          <div className="sejong_back">
            <div className={sejongColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="daejeon">
          <div className="daejeon_back">
            <div className={daejeonColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="gyeongsangbuk">
          <div className="gyeongsangbuk_back">
            <div className={gyeongsangbukColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="ulsan">
          <div className="ulsan_back">
            <div className={ulsanColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="gyeongsangnam">
          <div className="gyeongsangnam_back">
            <div className={gyeongsangnamColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="daegu">
          <div className="daegu_back">
            <div className={daeguColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="busan">
          <div className="busan_back">
            <div className={busanColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="jeju">
          <div className="jeju_back">
            <div className={jejuColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="ulleungdo">
          <div className="ulleungdo_back">
            <div className={ulleungdoColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
        <div className="dokdo">
          <div className="dokdo_back">
            <div className={dokdoColor}>
              <button type="button" className="mapbtn">
                강원도
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="kakao__map">
        <Kakaomap />
      </div>
    </div>
  );
}

export default Map;
