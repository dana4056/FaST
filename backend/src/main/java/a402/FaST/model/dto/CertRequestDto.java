package a402.FaST.model.dto;

import a402.FaST.model.entity.Cert;
import a402.FaST.model.entity.User;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CertRequestDto {

    private String email;
    private String code;

    public static CertRequestDto from(Cert cert) {
        if(cert == null) return null;

        return CertRequestDto.builder()
                .email(cert.getEmail())
                .code(cert.getCode())
                .build();
    }
}
