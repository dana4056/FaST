package a402.FaST.repository;

import a402.FaST.model.PK.UserHasLandMarkPK;
import a402.FaST.model.entity.UserHasLandMark;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserHasLandMarkRepository extends JpaRepository<UserHasLandMark, UserHasLandMarkPK> {
    boolean existsByUserIdAndLandMarkName(int userId, String landMarkName);
}
