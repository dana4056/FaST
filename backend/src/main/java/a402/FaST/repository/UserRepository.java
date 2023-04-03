package a402.FaST.repository;

import a402.FaST.model.entity.Follow;
import a402.FaST.model.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
   // 쿼리를 수행할 때 Lazy 조회가 아닌 Eager 조회로 authorities 정보를 같이 가져온다
   @EntityGraph(attributePaths = "authorities")
   Optional<User> findOneWithAuthoritiesByEmail(String email);
   Optional<User> findByEmail(String email);
   Optional<User> findByEmailAndProvider(String email, String provider);

   boolean existsByEmail(String email);
   boolean existsByNickname(String nickname);
   boolean existsById(int id);
   boolean existsByEmailAndProvider(String email, String provider);

   @Query(value = "select u.nickname from User u where u.id = :userId")
   String nickName (@Param("userId") int userId);

}
