import React, { Suspense } from 'react';

import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import Landmark from '../components/Landmark';

function ModelPage({ model }: any) {
  return (
    <div className="model-page">
      <div className="model-page__header">
        <Link to="/stamp">
          <div className="model-page__button--back">
            <MdArrowBackIos />
          </div>
        </Link>
      </div>
      <div className="model-page__model">
        {model ? (
          <Landmark
            Model={model.model}
            cameraPosition={model.cameraPosition}
            isControllable
          />
        ) : null}
      </div>
    </div>
  );
}

export default ModelPage;
