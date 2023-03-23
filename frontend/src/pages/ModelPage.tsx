import React from 'react';

import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import Landmark from '../components/Landmark';
import Seokguram from '../assets/blender/Seokguram';
import KingSejong from '../assets/blender/KingSejong';
import Building63 from '../assets/blender/Building63';
import Cheomseongdae from '../assets/blender/Cheomseongdae';
import Cheongwadae from '../assets/blender/Cheongwadae';
import Chinatown from '../assets/blender/ChinaTown';
import DolHareubang from '../assets/blender/DolHareubang';
import Gwangandaegyo from '../assets/blender/Gwangandaegyo';
import Gwanghwamun from '../assets/blender/Gwanghwamun';
import LotteTower from '../assets/blender/LotteTower';
import OlympicPark from '../assets/blender/OlympicPark';
import Seongsan from '../assets/blender/Seongsan';
import SeoulTower from '../assets/blender/SeoulTower';
import Sungnyemun from '../assets/blender/Sungnyemun';
import Yisunshin from '../assets/blender/Yisunshin';

function ModelPage({
  landmark,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  transX,
  transY,
}: any) {
  return (
    <div className="model-page">
      <div className="model-page__header">
        <Link to="/test">
          <div className="model-page__button--back">
            <MdArrowBackIos />
          </div>
        </Link>
      </div>
      <div
        className="model-page__model"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Landmark
          Model={(() => {
            if (landmark === 'seokguram') return Seokguram;
            if (landmark === 'kingsejong') return KingSejong;
            if (landmark === 'building63') return Building63;
            if (landmark === 'cheomseongdae') return Cheomseongdae;
            if (landmark === 'cheongwadae') return Cheongwadae;
            if (landmark === 'chinatown') return Chinatown;
            if (landmark === 'dolhareubang') return DolHareubang;
            if (landmark === 'gwangandaegyo') return Gwangandaegyo;
            if (landmark === 'gwanghwamun') return Gwanghwamun;
            if (landmark === 'lottetower') return LotteTower;
            if (landmark === 'olympicpark') return OlympicPark;
            if (landmark === 'seongsan') return Seongsan;
            if (landmark === 'seoultower') return SeoulTower;
            if (landmark === 'sungnyemun') return Sungnyemun;
            if (landmark === 'yisunshin') return Yisunshin;
            return null;
          })()}
          transX={transX}
          transY={transY}
        />
      </div>
    </div>
  );
}

export default ModelPage;
