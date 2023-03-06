import React from 'react';

import Map from '../components/Map';
import Kakaomap from '../components/Kakaomap';
import CardList from '../components/CardList';
import { MapPageProps } from '../types/PagePropsType';

function MapPage({ cardsLeft, cardsRight }: MapPageProps) {
  return (
    <div>
      <div className="mappage__map__container card">
        <div className="kakao__map">
          <Kakaomap />
        </div>
        <div className="whole__map">
          <Map />
        </div>
      </div>
      <CardList cardsLeft={cardsLeft} cardsRight={cardsRight} />
    </div>
  );
}

export default MapPage;
