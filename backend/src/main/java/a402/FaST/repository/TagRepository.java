package a402.FaST.repository;

import a402.FaST.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName (String name);
    boolean existsByName(String name);

    List<Tag> findAllByNameIn(List<String> names);

}
