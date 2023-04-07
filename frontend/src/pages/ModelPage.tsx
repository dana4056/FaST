import React, { Suspense } from 'react';

import { Link } from 'react-router-dom';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import Landmark from '../components/Landmark';
import { ModelPageProps } from '../types/PagePropsType';

function ModelPage({
  model,
  name,
  description,
  isVisited,
  moveBack,
}: ModelPageProps) {
  return (
    <div className="model-page">
      <div className="model-page__header">
        <Link to="/stamp">
          <div className="model-page__button--back">
            <MdArrowBack />
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
      {/* <div className="model-page__text-container card"> */}
      {/* <div className="model-page__name">{name}</div> */}
      {isVisited ? (
        <div className="model-page__text-box">
          <div className="scene">
            <div className="box">
              <div className="box__face box__face--front">
                <div className="model-page__name">{name}</div>
                <div className="model-page__description">{description}</div>
              </div>
              <div className="box__face box__face--back">
                <div className="model-page__name">{name}</div>
                <div className="model-page__description">{description}</div>
              </div>
              <div className="box__face box__face--right" />
              <div className="box__face box__face--left" />
              <div className="box__face box__face--top" />
              <div className="box__face box__face--bottom" />
            </div>
          </div>
        </div>
      ) : (
        <div className="model-page__modal card">
          <div className="model-page__modal-content">권한이 없습니다.</div>
          <button
            type="button"
            onClick={moveBack}
            className="model-page__modal-button"
          >
            닫기
          </button>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}

export default ModelPage;
