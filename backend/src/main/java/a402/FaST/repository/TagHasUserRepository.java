package a402.FaST.repository;

import a402.FaST.model.PK.TagHasUserPK;
import a402.FaST.model.entity.TagHasUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TagHasUserRepository extends JpaRepository<TagHasUser, TagHasUserPK> {
//public interface TagHasUserRepository extends JpaRepository<TagHasUser, Integer> {
}
