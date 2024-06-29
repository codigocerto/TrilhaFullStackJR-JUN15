package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.NotBlank;

public record UserChangeProfileRequestDTO(
        String name,
        String surname
) {
}
