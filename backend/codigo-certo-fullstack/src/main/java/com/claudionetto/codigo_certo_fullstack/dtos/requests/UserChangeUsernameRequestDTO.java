package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserChangeUsernameRequestDTO (
        @NotBlank
        @Size(min = 6, max = 40)
        String username
){
}
