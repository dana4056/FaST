package a402.FaST.service;

import a402.FaST.Controller.UserController;
import a402.FaST.exception.NotFoundMemberException;
import a402.FaST.model.dto.TagRequestDto;
import a402.FaST.model.dto.UserResponseDto;
import a402.FaST.model.entity.Authority;
import a402.FaST.model.entity.Tag;
import a402.FaST.model.entity.TagHasUser;
import a402.FaST.model.entity.User;
import a402.FaST.repository.TagHasUserRepository;
import a402.FaST.repository.TagRepository;
import a402.FaST.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;


@Service
@Transactional
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final TagRepository tagRepository;
    private final TagHasUserRepository tagHasUserRepository;
    private final UserRepository userRepository;

    @Override
    public UserResponseDto insertTag(TagRequestDto requestDto) {
        UserResponseDto userResponseDto = null;
        if(!userRepository.existsById(requestDto.getUserId())){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            for (String tagName : requestDto.getTags()){
                User user = userRepository.findById(requestDto.getUserId()).get();
                Tag tag = tagRepository.findByName(tagName).get();

                TagHasUser tagHasUser = TagHasUser.builder()
                        .user(user)
                        .tag(tag)
                        .build();
                tagHasUserRepository.save(tagHasUser);
            }
        }
        userResponseDto = UserResponseDto.from(userRepository.findById(requestDto.getUserId()).get());

        return userResponseDto;
    }

    @Override
    public boolean deleteTag(TagRequestDto requestDto) {
        if(!userRepository.existsById(requestDto.getUserId())){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else if (!tagRepository.existsById(requestDto.getTagId())){
            throw new NotFoundMemberException("없는 태그입니다");
        }
        else{
            tagHasUserRepository.TagDelete(requestDto.getTagId(), requestDto.getUserId());
        }
        return true;

    }
}
