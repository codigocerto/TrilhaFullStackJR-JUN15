package com.claudionetto.codigo_certo_fullstack.dtos.responses;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ProjectUserResponseDTO(
        UUID userId,
        String username
){
}
