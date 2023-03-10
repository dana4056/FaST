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
        if(!userRepository.existsById(requestDto.getId())){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            for (String tagName : requestDto.getTags()){
                User user = userRepository.findById(requestDto.getId()).get();
                Tag tag = tagRepository.findByName(tagName).get();
                logger.info(" User : {}", user.getId());
                logger.info(" Tag : {}", tag.getName());

                TagHasUser tagHasUser = TagHasUser.builder()
                        .user(user)
                        .tag(tag)
                        .build();
                logger.info("시작");
                tagHasUserRepository.save(tagHasUser);
                logger.info("끝");

            }
        }

        return null;
    }
}
