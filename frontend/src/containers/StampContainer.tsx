import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import StampPage from '../pages/StampPage';
import {
  LotteTower,
  NotLotteTower,
  Gwangandaegyo,
  NotGwangandaegyo,
  Gwanghwamun,
  NotGwanghwamun,
  DolHareubang,
  NotDolHareubang,
  SeoulTower,
  NotSeoulTower,
  Seongsan,
  NotSeongsan,
  KingSejong,
  NotKingSejong,
  Seokguram,
  NotSeokguram,
  Sungnyemun,
  NotSungnyemun,
  OlympicPark,
  NotOlympicPark,
  Building63,
  NotBuilding63,
  Yisunshin,
  NotYisunshin,
  ChinaTown,
  NotChinaTown,
  Cheongwadae,
  NotCheongwadae,
  Cheomseongdae,
  NotCheomseongdae,
} from '../components/models';
import { userInfo } from '../atoms/userInfo';
import useViewModel from '../viewmodels/LandmarkViewModel';

function StampContainer() {
  const user = useRecoilValue(userInfo);
  const { getLandmarks } = useViewModel();
  const navigate = useNavigate();
  const [models, setModels] = useState<any>({
    building63: {
      model: NotBuilding63,
      name: '63빌딩',
      link: 'building63',
      cameraPosition: [0, 0, 7],
      visited: false,
    },
    gwangandaegyo: {
      model: NotGwangandaegyo,
      name: '광안대교',
      link: 'gwangandaegyo',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    gwanghwamun: {
      model: NotGwanghwamun,
      name: '광화문',
      link: 'gwanghwamun',
      cameraPosition: [0, 0, 9],
      visited: false,
    },
    seoultower: {
      model: NotSeoulTower,
      name: '남산타워',
      link: 'seoultower',
      cameraPosition: [0, 0, 9],
      visited: false,
    },
    dolhareubang: {
      model: NotDolHareubang,
      name: '돌하르방',
      link: 'dolhareubang',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    lottetower: {
      model: NotLotteTower,
      name: '롯데타워',
      link: 'lottetower',
      cameraPosition: [0, 0, 6],
      visited: false,
    },
    seokguram: {
      model: NotSeokguram,
      name: '석굴암',
      link: 'seokguram',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    seongsan: {
      model: NotSeongsan,
      name: '성산일출봉',
      link: 'seongsan',
      cameraPosition: [0, 0, 3],
      visited: false,
    },
    kingsejong: {
      model: NotKingSejong,
      name: '세종대왕',
      link: 'kingsejong',
      cameraPosition: [0, 0, 4],
      visited: false,
    },

    sungnyemun: {
      model: NotSungnyemun,
      name: '숭례문',
      link: 'sungnyemun',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    olympicpark: {
      model: NotOlympicPark,
      name: '올림픽 공원',
      link: 'olympicpark',
      cameraPosition: [0, 0, 8],
      visited: false,
    },
    yisunshin: {
      model: NotYisunshin,
      name: '이순신',
      link: 'yisunshin',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    chinatown: {
      model: NotChinaTown,
      name: '차이나타운',
      link: 'chinatown',
      cameraPosition: [0, 0, 15],
      visited: false,
    },
    cheomseongdae: {
      model: NotCheomseongdae,
      name: '첨성대',
      link: 'cheomseongdae',
      cameraPosition: [0, 0, 5],
      visited: false,
    },
    cheongwadae: {
      model: NotCheongwadae,
      name: '청와대',
      link: 'cheongwadae',
      cameraPosition: [0, 0, 15],
      visited: false,
    },
  });

  const moveStampPage = (key: string) => {
    if (models[key].visited === true) {
      navigate(`/stamp/${models[key].link}`);
    }
  };

  const moveBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getData = async () => {
      const newModels = models;
      const res: any = await getLandmarks(user.id);
      if (res.status === 200 && res.data) {
        console.log(res.data);
        await Promise.all(
          res.data.map((landmark: any) => {
            switch (landmark.landMarkName) {
              case '숭례문':
                newModels.sungnyemun.model = Sungnyemun;
                newModels.sungnyemun.visited = true;
                break;
              case '남산타워':
                newModels.seoultower.model = SeoulTower;
                newModels.seoultower.visited = true;
                break;
              case '충무공이순신동상':
                newModels.yisunshin.model = Yisunshin;
                newModels.yisunshin.visited = true;
                break;
              case '롯데월드타워':
                newModels.lottetower.model = LotteTower;
                newModels.lottetower.visited = true;
                break;
              case '63시티':
                newModels.building63.model = Building63;
                newModels.building63.visited = true;
                break;
              case '올림픽공원세계평화의문':
                newModels.olympicpark.model = OlympicPark;
                newModels.olympicpark.visited = true;
                break;
              case '광화문':
                newModels.gwanghwamun.model = Gwanghwamun;
                newModels.gwanghwamun.visited = true;
                break;
              case '청와대':
                newModels.cheongwadae.model = Cheongwadae;
                newModels.cheongwadae.visited = true;
                break;
              case '세종대왕동상':
                newModels.kingsejong.model = KingSejong;
                newModels.kingsejong.visited = true;
                break;
              case '인천차이나타운':
                newModels.chinatown.model = ChinaTown;
                newModels.chinatown.visited = true;
                break;
              case '첨성대':
                newModels.cheomseongdae.model = Cheomseongdae;
                newModels.cheomseongdae.visited = true;
                break;
              case '석굴암':
                newModels.seokguram.model = Seokguram;
                newModels.seokguram.visited = true;
                break;
              case '광안대교':
                newModels.gwangandaegyo.model = Gwangandaegyo;
                newModels.gwangandaegyo.visited = true;
                break;
              case '돌하르방':
                newModels.dolhareubang.model = DolHareubang;
                newModels.dolhareubang.visited = true;
                break;
              case '성산일출봉':
                newModels.seongsan.model = Seongsan;
                newModels.seongsan.visited = true;
                break;
              default:
                break;
            }

            return landmark;
          })
        );
        setModels({ ...newModels });
      }
    };
    getData();
  }, []);
  return (
    <StampPage
      models={models}
      moveStampPage={moveStampPage}
      moveBack={moveBack}
    />
  );
}

export default StampContainer;
