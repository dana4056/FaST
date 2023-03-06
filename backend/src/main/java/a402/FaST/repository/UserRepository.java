package a402.FaST.repository;

import a402.FaST.model.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
   // 쿼리를 수행할 때 Lazy 조회가 아닌 Eager 조회로 authorities 정보를 같이 가져온다
   @EntityGraph(attributePaths = "authorities")
   Optional<User> findOneWithAuthoritiesByUsername(String username);
}
