package a402.FaST.repository;


import a402.FaST.model.entity.Cert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertRepository extends JpaRepository<Cert, String> {
}
