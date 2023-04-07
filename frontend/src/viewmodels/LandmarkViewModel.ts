import React from 'react';
import api from '../api/crawling';
import doGetLandmarks from '../api/landmark';

function LandmarkViewModel() {
  const getLandmarkData = async (landmark: string) => {
    const res = await api.crawling(landmark);
    return res;
  };
  const getLandmarks = async (userId: number) => {
    const res = await doGetLandmarks(userId);
    return res;
  };
  return {
    getLandmarkData,
    getLandmarks,
  };
}

export default LandmarkViewModel;
