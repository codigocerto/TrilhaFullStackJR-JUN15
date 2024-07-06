package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRegisterDTO(

        @NotBlank
        String name,
        @NotBlank
        String surname,
        @NotBlank
        @Size(min = 6, max = 40)
        String username,
        @NotBlank
        @Email
        String email,
        @NotBlank
        @Size(min = 8, max = 255)
        String password

){
}
