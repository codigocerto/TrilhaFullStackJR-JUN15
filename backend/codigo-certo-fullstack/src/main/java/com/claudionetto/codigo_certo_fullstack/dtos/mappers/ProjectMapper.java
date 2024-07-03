package com.claudionetto.codigo_certo_fullstack.dtos.mappers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectUserResponseDTO;
import com.claudionetto.codigo_certo_fullstack.models.entities.Project;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;

public class ProjectMapper {

    public static Project transformRequestToEntity(ProjectRequestDTO projectRequestDTO, User user){

        return Project.builder()
                .name(projectRequestDTO.name())
                .description(projectRequestDTO.description())
                .projectStatus(projectRequestDTO.projectStatus())
                .user(user)
                .build();
    }

    public static ProjectUserResponseDTO transformUserEntityToProjectUserResponseDTO(User user){
        return ProjectUserResponseDTO.builder()
                .username(user.getUsername())
                .userId(user.getId())
                .build();
    }

    public static ProjectResponseDTO transformEntityToResponse(Project project){
        return ProjectResponseDTO.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .projectStatus(project.getProjectStatus())
                .projectUserResponse(transformUserEntityToProjectUserResponseDTO(project.getUser()))
                .build();
    }

}
