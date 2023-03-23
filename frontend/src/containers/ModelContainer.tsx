import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModelPage from '../pages/ModelPage';

function ModelContainer() {
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [transX, setTransX] = useState<number>(0);
  const [transY, setTransY] = useState<number>(0);
  const params = useParams();

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartX(event.touches[0].clientX);
    setStartY(event.touches[0].clientY);
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTransX(event.touches[0].clientX - startX);
    setTransY(event.touches[0].clientY - startY);
  };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    setStartX(0);
    setStartY(0);
    setTransX(0);
    setTransY(0);
  };

  return (
    <ModelPage
      landmark={params.model}
      handleTouchStart={handleTouchStart}
      handleTouchMove={handleTouchMove}
      handleTouchEnd={handleTouchEnd}
      transX={transX}
      transY={transY}
    />
  );
}

export default ModelContainer;
