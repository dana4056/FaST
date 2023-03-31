import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from '@react-icons/all-files/md/MdArrowBack';

import KoreaMap from '../components/KoreaMap';
import CardList from '../components/CardList';
import { MapPageProps } from '../types/PagePropsType';

function MapPage({ isMine, cardsLeft, cardsRight }: MapPageProps) {
  return (
    <div className="map-page">
      <div className="map-page__header">
        <Link to="/myrecord">
          <MdArrowBack />
        </Link>
      </div>
      <div className="mappage__map__container card">
        <div className="whole__map">
          <KoreaMap />
        </div>
      </div>
      <CardList isMine={isMine} cardsLeft={cardsLeft} cardsRight={cardsRight} />
    </div>
  );
}

export default MapPage;
