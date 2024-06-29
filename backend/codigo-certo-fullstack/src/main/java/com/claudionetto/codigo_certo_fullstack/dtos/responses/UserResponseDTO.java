package com.claudionetto.codigo_certo_fullstack.dtos.responses;

import lombok.Builder;

@Builder
public record UserResponseDTO(
        String name,
        String surname,
        String username
) {
}
