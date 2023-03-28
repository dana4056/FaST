package a402.FaST.repository;

import a402.FaST.model.PK.TagHasUserPK;
import a402.FaST.model.entity.TagHasUser;
import a402.FaST.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface TagHasUserRepository extends JpaRepository<TagHasUser, TagHasUserPK> {

    @Modifying
    @Query("delete from TagHasUser e where e.tag.id = :tagId and e.user.id = :userId")
    void TagDelete(@Param("tagId") int tagId, @Param("userId") int userId);

    void deleteAllByUser(User userId);
}
