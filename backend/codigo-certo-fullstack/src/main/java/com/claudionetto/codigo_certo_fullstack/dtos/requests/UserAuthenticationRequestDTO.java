package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
@Builder
public record UserAuthenticationRequestDTO(
        @NotBlank
        String username,
        @NotBlank
        String password
) {
}
