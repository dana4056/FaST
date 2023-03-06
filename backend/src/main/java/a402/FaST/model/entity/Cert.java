package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "cert")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cert {
    @Id
    private String email;
    private String code;
}
