package com.claudionetto.codigo_certo_fullstack.dtos.requests;

import com.claudionetto.codigo_certo_fullstack.models.enums.ProjectStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProjectRequestDTO(
        @NotBlank
        String name,
        @NotBlank
        String description,
        @NotNull
        ProjectStatus projectStatus) {
}
