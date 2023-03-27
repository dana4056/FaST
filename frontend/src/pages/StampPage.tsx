import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';

import Landmark from '../components/Landmark';

function StampPage({ models }: any) {
  return (
    <div className="stamp-page">
      <div className="stamp-page__header">
        <Link to="/test">
          <div className="stamp-page__button--back">
            <MdArrowBackIos />
          </div>
        </Link>
      </div>
      <div className="stamp-page__content">
        {models.map((model: any) => (
          <div className="stamp-page__landmark-card card" key={model.name}>
            <Link to={model.link}>
              <div className="stamp-page__landmark-model">
                <Landmark
                  Model={model.model}
                  cameraPosition={model.cameraPosition}
                />
              </div>
              <div className="stamp-page__landmark-name">{model.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StampPage;
