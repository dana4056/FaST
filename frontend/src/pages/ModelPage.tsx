import React from 'react';

import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import Landmark from '../components/Landmark';
import Seokguram from '../assets/blender/Seokguram';

function ModelPage({
  model,
  landmark,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  transX,
  transY,
}: any) {
  return (
    <div className="model-page">
      <div className="model-page__header">
        <Link to="/test">
          <div className="model-page__button--back">
            <MdArrowBackIos />
          </div>
        </Link>
      </div>
      <div
        className="model-page__model"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {landmark === 'seokguram' ? (
          <Landmark Model={Seokguram} transX={transX} transY={transY} />
        ) : null}
      </div>
    </div>
  );
}

export default ModelPage;
