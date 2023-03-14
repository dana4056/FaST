package a402.FaST.repository;

import a402.FaST.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Optional<Tag> findByName (String name);
    boolean existsByName(String name);

}
