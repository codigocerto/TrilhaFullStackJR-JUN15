package com.claudionetto.codigo_certo_fullstack.services;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserProjectService {

    Page<ProjectResponseDTO> findAllProjectsByUser (UUID userId, Pageable pageable);
    ProjectResponseDTO findUserProjectById(UUID userId, Long projectId);
    ProjectResponseDTO saveUserProject(UUID userId, ProjectRequestDTO projectRequestDTO);

    ProjectResponseDTO updateUserProject(UUID userId, Long projectId, ProjectRequestDTO projectRequestDTO);
    void deleteUserProjectById(UUID userId, Long projectId);

}
