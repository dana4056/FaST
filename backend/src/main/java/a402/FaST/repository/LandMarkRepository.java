package a402.FaST.repository;


import a402.FaST.model.entity.LandMark;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LandMarkRepository extends JpaRepository<LandMark, String> {

}
