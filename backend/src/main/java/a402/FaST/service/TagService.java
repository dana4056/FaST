package a402.FaST.service;


import a402.FaST.model.dto.TagRequestDto;
import a402.FaST.model.dto.UserResponseDto;

public interface TagService {
    UserResponseDto insertTag (TagRequestDto requestDto);
}
