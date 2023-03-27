import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModelPage from '../pages/ModelPage';
import useViewModel from '../viewmodels/LandmarkViewModel';
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
  Building63,
  Yisunshin,
  ChinaTown,
  Cheongwadae,
  Cheomseongdae,
} from '../components/models';

function ModelContainer() {
  const params = useParams();
  const [model, setModel] = useState<any>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  const { getLandmarkData } = useViewModel();

  useEffect(() => {
    switch (params.model) {
      case 'building63':
        setModel({
          model: Building63,
          cameraPosition: [0, 0, 7],
        });
        setName('63빌딩');
        break;
      case 'gwangandaegyo':
        setModel({
          model: Gwangandaegyo,
          cameraPosition: [0, 0, 5],
        });
        setName('광안대교');
        break;
      case 'gwanghwamun':
        setModel({
          model: Gwanghwamun,
          cameraPosition: [0, 0, 10],
        });
        setName('광화문');
        break;
      case 'seoultower':
        setModel({
          model: SeoulTower,
          cameraPosition: [0, 0, 9],
        });
        setName('남산타워');
        break;
      case 'dolhareubang':
        setModel({
          model: DolHareubang,
          cameraPosition: [0, 0, 5],
        });
        setName('돌하르방');
        break;
      case 'lottetower':
        setModel({
          model: LotteTower,
          cameraPosition: [0, 0, 6],
        });
        setName('롯데타워');
        break;
      case 'seokguram':
        setModel({
          model: Seokguram,
          cameraPosition: [0, 0, 5],
        });
        setName('석굴암');
        break;
      case 'seongsan':
        setModel({
          model: Seongsan,
          cameraPosition: [0, 0, 3],
        });
        setName('성산일출봉');
        break;
      case 'kingsejong':
        setModel({
          model: KingSejong,
          cameraPosition: [0, 0, 4],
        });
        setName('세종대왕');
        break;
      case 'sungnyemun':
        setModel({
          model: Sungnyemun,
          cameraPosition: [0, 0, 5],
        });
        setName('숭례문');
        break;
      case 'olympicpark':
        setModel({
          model: OlympicPark,
          cameraPosition: [0, 0, 8],
        });
        setName('올림픽공원');
        break;
      case 'yisunshin':
        setModel({
          model: Yisunshin,
          cameraPosition: [0, 0, 5],
        });

        setName('이순신');
        break;
      case 'chinatown':
        setModel({
          model: ChinaTown,
          cameraPosition: [0, 0, 15],
        });

        setName('차이나타운');
        break;
      case 'cheomseongdae':
        setModel({
          model: Cheomseongdae,
          cameraPosition: [0, 0, 6],
        });

        setName('첨성대');
        break;
      case 'cheongwadae':
        setModel({
          model: Cheongwadae,
          cameraPosition: [0, 0, 15],
        });

        setName('청와대');
        break;
      default:
        break;
    }
    const getData = async (landmark: string) => {
      const response = await getLandmarkData(landmark);
      setDescription(response.data);
    };

    if (params.model) {
      getData(params.model);
    }
  }, []);

  return <ModelPage model={model} name={name} description={description} />;
}

export default ModelContainer;
