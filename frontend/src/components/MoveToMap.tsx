import React from 'react';
import { Link } from 'react-router-dom';

function MoveToMap() {
  return (
    <div className="move__btn__container">
      <Link to="/test">
        <button type="button" className="move-stamp-btn">
          스탬프 보기
        </button>
      </Link>
      <Link to="/map">
        <button type="button" className="move-map-btn">
          지도 보기
        </button>
      </Link>
    </div>
  );
}

export default MoveToMap;
