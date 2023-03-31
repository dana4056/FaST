package a402.FaST.service;


import a402.FaST.model.dto.LandMarkResponseDto;

import java.util.List;

public interface LandMarkService {
    List<LandMarkResponseDto> findLandMark(int userId);
}