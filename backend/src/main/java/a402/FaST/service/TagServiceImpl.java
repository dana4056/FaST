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
        if(!userRepository.existsByEmail(requestDto.getEmail())){
            throw new NotFoundMemberException("없는 유저입니다.");
        }else{
            for (String tagName : requestDto.getTags()){
                if (!tagRepository.existsByName(tagName)){
                    Tag tag = Tag.builder().name(tagName).build();
                    logger.info(" Tag : {}", tag.getName());
                    tagRepository.save(tag);
                }
                User user = userRepository.findByEmail(requestDto.getEmail()).get();
                Tag temp = tagRepository.findByName(tagName).get();
                logger.info(" User : {}", user.getId());
                logger.info(" Tag : {}", temp.getName());

                TagHasUser tagHasUser = TagHasUser.builder()
                        .user(userRepository.findByEmail(requestDto.getEmail()).get())
                        .tag(tagRepository.findByName(tagName).get())
                        .build();
                logger.info("시작");
                tagHasUserRepository.save(tagHasUser);
                logger.info("끝");

            }
        }

        return null;
    }
}
