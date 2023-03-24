import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModelPage from '../pages/ModelPage';
import Gwangandaegyo from '../components/models/Gwangandaegyo';
import Gwanghwamun from '../components/models/Gwanghwamun';
import Dolhareubang from '../components/models/DolHareubang';

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
      case 'dolhareubang':
        setModel({
          model: Dolhareubang,
          cameraPosition: [0, 0, 5],
        });
        break;
      default:
        break;
    }
  }, []);

  return <ModelPage model={model} />;
}

export default ModelContainer;
