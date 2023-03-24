import React from 'react';

import StampPage from '../pages/StampPage';
import {
  LotteTower,
  Gwangandaegyo,
  Gwanghwamun,
  DolHareubang,
} from '../components/models';

function StampContainer() {
  const models = [
    {
      model: Gwangandaegyo,
      name: '광안대교',
      link: 'gwangandaegyo',
      cameraPosition: [0, 0, 5],
    },
    {
      model: Gwanghwamun,
      name: '광화문',
      link: 'gwanghwamun',
      cameraPosition: [0, 0, 10],
    },
    {
      model: DolHareubang,
      name: '돌하르방',
      link: 'dolhareubang',
      cameraPosition: [0, 0, 5],
    },
  ];
  return <StampPage models={models} />;
}

export default StampContainer;
