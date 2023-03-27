import { AxiosResponse } from 'axios';
import React from 'react';

import api from '../api/crawling';

function LandmarkViewModel() {
  const getLandmarkData = async (landmark: string) => {
    const res = await api.crawling(landmark);
    return res.data;
  };
  return {
    getLandmarkData,
  };
}

export default LandmarkViewModel;
