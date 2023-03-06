import React from 'react';
import { MdNavigateNext } from 'react-icons/md';

function MoveToMap() {
  return (
    <div>
      <button type="button" className="move-map-btn">
        지도 보기
        <MdNavigateNext className="next-btn" />
      </button>
    </div>
  );
}

export default MoveToMap;
