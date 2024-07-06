package com.claudionetto.codigo_certo_fullstack.dtos.responses;

import lombok.Builder;

import java.util.UUID;

@Builder
public record UserChangeUsernameResponseDTO (
        UUID id,
        String username,
        String newToken
) {
}
