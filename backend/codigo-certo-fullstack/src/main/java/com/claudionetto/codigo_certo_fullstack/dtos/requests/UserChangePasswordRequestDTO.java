package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.NotBlank;

public record UserChangePasswordRequestDTO (
        @NotBlank
        String currentPassword,
        @NotBlank
        String newPassword
){
}
