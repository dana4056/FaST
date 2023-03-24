import React from 'react';

import StampPage from '../pages/StampPage';
import Gwangandaegyo from '../components/models/Gwangandaegyo';
import Gwanghwamun from '../components/models/Gwanghwamun';

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
  ];
  return <StampPage models={models} />;
}

export default StampContainer;
