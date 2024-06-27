package com.claudionetto.codigo_certo_fullstack.dtos.mappers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.models.entities.Project;

public class ProjectMapper {

    public static Project transformRequestToEntity(ProjectRequestDTO projectRequestDTO){

        return Project.builder()
                .name(projectRequestDTO.name())
                .description(projectRequestDTO.description())
                .projectStatus(projectRequestDTO.projectStatus())
                .build();
    }

    public static ProjectResponseDTO transformEntityToResponse(Project project){
        return ProjectResponseDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .projectStatus(project.getProjectStatus())
                .build();
    }

}
