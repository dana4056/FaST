import React, { Suspense } from 'react';

import { Link } from 'react-router-dom';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';
import Landmark from '../components/Landmark';
import { ModelPageProps } from '../types/PagePropsType';

function ModelPage({ model, name, description }: ModelPageProps) {
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
      <div className="model-page__name">{name}</div>
      <div className="model-page__description">{description}</div>
    </div>
  );
}

export default ModelPage;
