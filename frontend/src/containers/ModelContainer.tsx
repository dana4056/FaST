import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
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
import { ModelType } from '../types/PagePropsType';
import { userInfo } from '../atoms/userInfo';

function ModelContainer() {
  const params = useParams();
  const [model, setModel] = useState<ModelType>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { getLandmarkData, getLandmarks } = useViewModel();
  const user = useRecoilValue(userInfo);
  const [isVisited, setIsVisited] = useState<boolean>(true);
  const navigate = useNavigate();

  const moveBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getLandmarksData = async () => {
      const res: any = await getLandmarks(user.id);
      if (res.status === 200) {
        if (params.model) {
          if (
            params.model === 'building63' &&
            res.data.find((landmark: any) => landmark.landMarkName === '63시티')
          ) {
            setModel({
              model: Building63,
              cameraPosition: [0, 0, 7],
            });
            setName('63빌딩');
          } else if (
            params.model === 'gwangandaegyo' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '광안대교'
            )
          ) {
            setModel({
              model: Gwangandaegyo,
              cameraPosition: [0, 0, 5],
            });
            setName('광안대교');
          } else if (
            params.model === 'gwanghwamun' &&
            res.data.find((landmark: any) => landmark.landMarkName === '광화문')
          ) {
            setModel({
              model: Gwanghwamun,
              cameraPosition: [0, 0, 10],
            });
            setName('광화문');
          } else if (
            params.model === 'seoultower' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '남산타워'
            )
          ) {
            setModel({
              model: SeoulTower,
              cameraPosition: [0, 0, 9],
            });
            setName('남산타워');
          } else if (
            params.model === 'dolhareubang' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '돌하르방'
            )
          ) {
            setModel({
              model: DolHareubang,
              cameraPosition: [0, 0, 5],
            });
            setName('돌하르방');
          } else if (
            params.model === 'lottetower' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '롯데월드타워'
            )
          ) {
            setModel({
              model: LotteTower,
              cameraPosition: [0, 0, 6],
            });
            setName('롯데타워');
          } else if (
            params.model === 'seokguram' &&
            res.data.find((landmark: any) => landmark.landMarkName === '석굴암')
          ) {
            setModel({
              model: Seokguram,
              cameraPosition: [0, 0, 5],
            });
            setName('석굴암');
          } else if (
            params.model === 'seongsan' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '성산일출봉'
            )
          ) {
            setModel({
              model: Seongsan,
              cameraPosition: [0, 0, 3],
            });
            setName('성산일출봉');
          } else if (
            params.model === 'kingsejong' &&
            res.data.find(
              (landmark: any) => landmark.landmarkName === '세종대왕동상'
            )
          ) {
            setModel({
              model: KingSejong,
              cameraPosition: [0, 0, 4],
            });
            setName('세종대왕');
          } else if (
            params.model === 'sungnyemun' &&
            res.data.find((landmark: any) => landmark.landMarkName === '숭례문')
          ) {
            setModel({
              model: Sungnyemun,
              cameraPosition: [0, 0, 5],
            });
            setName('숭례문');
          } else if (
            params.model === 'olympicpark' &&
            res.data.find(
              (landmark: any) =>
                landmark.landMarkName === '올림픽공원세계평화의문'
            )
          ) {
            setModel({
              model: OlympicPark,
              cameraPosition: [0, 0, 8],
            });
            setName('올림픽공원');
          } else if (
            params.model === 'yisunshin' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '충무공이순신동상'
            )
          ) {
            setModel({
              model: Yisunshin,
              cameraPosition: [0, 0, 5],
            });

            setName('이순신');
          } else if (
            params.model === 'chinatown' &&
            res.data.find(
              (landmark: any) => landmark.landMarkName === '인천차이나타운'
            )
          ) {
            setModel({
              model: ChinaTown,
              cameraPosition: [0, 0, 15],
            });

            setName('차이나타운');
          } else if (
            params.model === 'cheomseongdae' &&
            res.data.find((landmark: any) => landmark.landMarkName === '첨성대')
          ) {
            setModel({
              model: Cheomseongdae,
              cameraPosition: [0, 0, 6],
            });

            setName('첨성대');
          } else if (
            params.model === 'cheongwadae' &&
            res.data.find((landmark: any) => landmark.landMarkName === '청와대')
          ) {
            setModel({
              model: Cheongwadae,
              cameraPosition: [0, 0, 15],
            });
            setName('청와대');
          } else {
            setIsVisited(false);
          }
        }
      }
    };
    const getDescriptionData = async (landmark: string) => {
      const res = await getLandmarkData(landmark);
      if (res.status === 200) {
        setDescription(res.data.data);
      }
    };

    if (params.model) {
      getLandmarksData();
      getDescriptionData(params.model);
    }
  }, []);

  return (
    <ModelPage
      model={model}
      name={name}
      description={description}
      isVisited={isVisited}
      moveBack={moveBack}
    />
  );
}

export default ModelContainer;
