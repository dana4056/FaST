import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModelPage from '../pages/ModelPage';
import {
  LotteTower,
  DolHareubang,
  Gwangandaegyo,
  Gwanghwamun,
  SeoulTower,
  Seongsan,
  KingSejong,
  Seokguram,
  Sungnyemun,
  OlympicPark,
} from '../components/models';

function ModelContainer() {
  const params = useParams();
  const [model, setModel] = useState<any>();

  useEffect(() => {
    switch (params.model) {
      case 'gwangandaegyo':
        setModel({
          model: Gwangandaegyo,
          cameraPosition: [0, 0, 5],
        });
        break;
      case 'gwanghwamun':
        setModel({
          model: Gwanghwamun,
          cameraPosition: [0, 0, 10],
        });
        break;
      case 'seoultower':
        setModel({
          model: SeoulTower,
          cameraPosition: [0, 0, 9],
        });
        break;
      case 'dolhareubang':
        setModel({
          model: DolHareubang,
          cameraPosition: [0, 0, 5],
        });
        break;
      case 'lottetower':
        setModel({
          model: LotteTower,
          cameraPosition: [0, 0, 6],
        });
        break;
      case 'seokguram':
        setModel({
          model: Seokguram,
          cameraPosition: [0, 0, 5],
        });
        break;
      case 'seongsan':
        setModel({
          model: Seongsan,
          cameraPosition: [0, 0, 3],
        });
        break;
      case 'kingsejong':
        setModel({
          model: KingSejong,
          cameraPosition: [0, 0, 4],
        });
        break;
      case 'sungnyemun':
        setModel({
          model: Sungnyemun,
          cameraPosition: [0, 0, 5],
        });
        break;
      case 'olympicpark':
        setModel({
          model: OlympicPark,
          cameraPosition: [0, 0, 8],
        });
        break;
      default:
        break;
    }
  }, []);

  return <ModelPage model={model} />;
}

export default ModelContainer;
