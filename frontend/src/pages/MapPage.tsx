import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';

import KoreaMap from '../components/KoreaMap';
import CardList from '../components/CardList';
import { MapPageProps } from '../types/PagePropsType';

function MapPage({ cardsLeft, cardsRight }: MapPageProps) {
  return (
    <div className="map-page">
      <div className="map-page__header">
        <Link to="/myrecord">
          <MdArrowBackIosNew />
        </Link>
      </div>
      <div className="mappage__map__container card">
        <div className="whole__map">
          <KoreaMap />
        </div>
      </div>
      <CardList cardsLeft={cardsLeft} cardsRight={cardsRight} />
    </div>
  );
}

export default MapPage;
