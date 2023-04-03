import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function MoveToMap() {
  const params = useParams();
  const [user, setUser] = useState<any>(params.userId);
  const navigate = useNavigate();

  const onClickMap = () => {
    navigate(`/map/${user}`);
  };
  return (
    <div className="move__btn__container">
      <Link to="/stamp">
        <button type="button" className="move-stamp-btn">
          스탬프 보기
        </button>
      </Link>
      <button type="button" className="move-map-btn" onClick={onClickMap}>
        지도 보기
      </button>
    </div>
  );
}

export default MoveToMap;
