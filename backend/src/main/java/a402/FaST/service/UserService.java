package a402.FaST.service;

import a402.FaST.model.dto.TokenDto;
import a402.FaST.model.dto.UserRequestDto;
import a402.FaST.model.dto.UserResponseDto;

public interface UserService {
    UserResponseDto signup(UserRequestDto requestDto);
    TokenDto getToken(UserRequestDto requestDto) throws Exception;

    UserResponseDto getUser(UserRequestDto requestDto);
}