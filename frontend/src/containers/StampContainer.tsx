import React from 'react';

import StampPage from '../pages/StampPage';
import {
  LotteTower,
  Gwangandaegyo,
  Gwanghwamun,
  DolHareubang,
  SeoulTower,
  Seongsan,
  KingSejong,
  Seokguram,
  Sungnyemun,
  OlympicPark,
  Building63,
  Yisunshin,
  ChinaTown,
} from '../components/models';

function StampContainer() {
  const models = [
    {
      model: Building63,
      name: '63빌딩',
      link: 'building63',
      cameraPosition: [0, 0, 7],
    },
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
    {
      model: Seokguram,
      name: '석굴암',
      link: 'seokguram',
      cameraPosition: [0, 0, 5],
    },
    {
      model: Seongsan,
      name: '성산일출봉',
      link: 'seongsan',
      cameraPosition: [0, 0, 3],
    },
    {
      model: KingSejong,
      name: '세종대왕',
      link: 'kingsejong',
      cameraPosition: [0, 0, 4],
    },
    {
      model: Sungnyemun,
      name: '숭례문',
      link: 'sungnyemun',
      cameraPosition: [0, 0, 5],
    },
    {
      model: OlympicPark,
      name: '올림픽 공원',
      link: 'olympicpark',
      cameraPosition: [0, 0, 8],
    },
    {
      model: Yisunshin,
      name: '이순신',
      link: 'yisunshin',
      cameraPosition: [0, 0, 5],
    },
    {
      model: ChinaTown,
      name: '차이나타운',
      link: 'chinatown',
      cameraPosition: [0, 0, 15],
    },
  ];
  return <StampPage models={models} />;
}

export default StampContainer;
