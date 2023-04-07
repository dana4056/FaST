import React from 'react';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import Landmark from '../components/Landmark';

function StampPage({ models, moveStampPage, moveBack }: any) {
  return (
    <div className="stamp-page">
      <div className="stamp-page__header">
        <div
          className="stamp-page__button--back"
          role="presentation"
          onClick={moveBack}
        >
          <MdArrowBack />
        </div>
      </div>
      <div className="stamp-page__content">
        {Object.keys(models).map((key: string) => (
          <div
            className="stamp-page__landmark-card card"
            key={models[key].name}
            role="presentation"
            onClick={() => moveStampPage(key)}
          >
            <div className="stamp-page__landmark-model">
              <Landmark
                Model={models[key].model}
                cameraPosition={models[key].cameraPosition}
              />
            </div>
            <div className="stamp-page__landmark-name">{models[key].name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StampPage;
