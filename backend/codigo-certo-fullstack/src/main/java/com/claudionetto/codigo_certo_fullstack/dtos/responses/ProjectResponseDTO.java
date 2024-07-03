package com.claudionetto.codigo_certo_fullstack.dtos.responses;

import com.claudionetto.codigo_certo_fullstack.models.enums.ProjectStatus;
import lombok.Builder;

@Builder
public record ProjectResponseDTO(
        Long id,
        String name,
        String description,
        ProjectStatus projectStatus,
        ProjectUserResponseDTO projectUserResponse
) {
}
