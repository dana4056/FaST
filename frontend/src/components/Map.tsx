import React from 'react';

import koreamap from '../assets/images/koreamap.png';
import photocardimg from '../assets/images/photocardimg.jpeg';

function Map() {
  return (
    <div className="map">
      <div className="total__map">
        <img src={koreamap} alt="koreamap" className="base__map" />
        <div className="seoul">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gyunggi">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="incheon">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gangwon">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gyeongsangbuk">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="daejun">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="daegoo">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="chungcheongbuk">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="chungcheongnam">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="jeollabuk">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="jeollanam">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gwangju">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gyeongsangnam">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="ulsan">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="busan">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="sejong">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="jeju">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="ulleungdo">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="dokdo">
          <img src={photocardimg} alt="photocardimg" />
        </div>
      </div>
    </div>
  );
}

export default Map;
