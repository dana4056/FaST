import React from 'react';

import koreamap from '../assets/images/koreamap.png';
import photocardimg from '../assets/images/photocardimg.jpeg';
import sample1 from '../assets/images/sample-images/sample_1.jpg';
import sample2 from '../assets/images/sample-images/sample_2.jpg';
import sample3 from '../assets/images/sample-images/sample_3.jpg';

function Map() {
  return (
    <div className="koreamap">
      <div className="total__map">
        <img src={koreamap} alt="koreamap" className="base__map" />
        <div className="seoul">
          <img src={sample1} alt="sample1" />
        </div>
        <div className="gyunggi">
          <img src={sample2} alt="sample2" />
        </div>
        <div className="incheon">
          <img src={sample3} alt="sample3" />
        </div>
        <div className="gangwon">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gyeongsangbuk">
          <img src={sample3} alt="sample3" />
        </div>
        <div className="daejun">
          <img src={sample1} alt="sample1" />
        </div>
        <div className="daegoo">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="chungcheongbuk">
          <img src={sample1} alt="sample1" />
        </div>
        <div className="chungcheongnam">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="jeollabuk">
          <img src={sample1} alt="sample1" />
        </div>
        <div className="jeollanam">
          <img src={sample2} alt="sample2" />
        </div>
        <div className="gwangju">
          <img src={photocardimg} alt="photocardimg" />
        </div>
        <div className="gyeongsangnam">
          <img src={sample1} alt="sample1" />
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
