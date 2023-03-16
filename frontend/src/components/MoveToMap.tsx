import React from 'react';
import { MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';

function MoveToMap() {
  return (
    <Link to="/map">
      <button type="button" className="move-map-btn">
        지도 보기
        <MdNavigateNext className="next-btn" />
      </button>
    </Link>
  );
}

export default MoveToMap;
