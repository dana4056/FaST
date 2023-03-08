package a402.FaST.service;

import a402.FaST.model.dto.CertRequestDto;

public interface CertService {
    String sendMessage(CertRequestDto requestDto) throws Exception;
    Boolean checkMessage(CertRequestDto requestDto) throws Exception;
}