package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterDTO(

        @NotBlank
        String name,
        @NotBlank
        String surname,
        @NotBlank
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Size(min = 8)
        String password

){
}
