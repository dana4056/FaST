package a402.FaST.repository;


import a402.FaST.model.PK.FollowPK;
import a402.FaST.model.dto.NotFollowList;
import a402.FaST.model.entity.Follow;
import a402.FaST.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface FollowRepository extends JpaRepository<Follow, FollowPK> {
    boolean existsByFromIdAndToId(User fromId, User toId);
    int countByToId(User toId);
    int countByFromId(User fromId);

    @Modifying
    @Query("delete from Follow f where f.fromId = :fromId and f.toId = :toId")
    void FollowDelete(@Param("fromId") User fromId, @Param("toId") User toId);


    @Query(value = "select u.nickname, u.img_path " +
            "from User u " +
            "where u.id not in (select f.from_id from Follow f where f.to_id = ?1)", nativeQuery = true)
    List<NotFollowList> SearchNotFollower(int to_id);



}
