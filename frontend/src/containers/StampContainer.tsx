import React from 'react';

import StampPage from '../pages/StampPage';
import {
  LotteTower,
  Gwangandaegyo,
  Gwanghwamun,
  DolHareubang,
  SeoulTower,
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
      model: SeoulTower,
      name: '남산타워',
      link: 'seoultower',
      cameraPosition: [0, 0, 9],
    },
    {
      model: DolHareubang,
      name: '돌하르방',
      link: 'dolhareubang',
      cameraPosition: [0, 0, 5],
    },
    {
      model: LotteTower,
      name: '롯데타워',
      link: 'lottetower',
      cameraPosition: [0, 0, 6],
    },
  ];
  return <StampPage models={models} />;
}

export default StampContainer;
