package com.claudionetto.codigo_certo_fullstack.services.impl;

import com.claudionetto.codigo_certo_fullstack.dtos.mappers.ProjectMapper;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.exceptions.EntityNotFoundException;
import com.claudionetto.codigo_certo_fullstack.models.entities.Project;
import com.claudionetto.codigo_certo_fullstack.repositories.ProjectRepository;
import com.claudionetto.codigo_certo_fullstack.services.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponseDTO findById(Long id) {
        Project project = findByIdOrThrowNotFoundException(id);
        return ProjectMapper.transformEntityToResponse(project);
    }

    @Override
    public Page<ProjectResponseDTO> findAll(Pageable pageable) {

        Page<Project> projects = projectRepository.findAll(pageable);

        return projects.map(ProjectMapper::transformEntityToResponse);
    }

    @Override
    public ProjectResponseDTO save(ProjectRequestDTO projectRequestDTO) {

        Project project = ProjectMapper.transformRequestToEntity(projectRequestDTO);
        Project projectSaved = projectRepository.save(project);

        return ProjectMapper.transformEntityToResponse(projectSaved);
    }

    @Override
    public ProjectResponseDTO update(Long id, ProjectRequestDTO projectRequestDTO) {

        Project project = findByIdOrThrowNotFoundException(id);

        if (projectRequestDTO.name() != null){
            project.setName(projectRequestDTO.name());
        }
        if (projectRequestDTO.description() != null){
            project.setDescription(projectRequestDTO.description());
        }
        if (projectRequestDTO.projectStatus() != null){
            project.setProjectStatus(projectRequestDTO.projectStatus());
        }

        Project projectSaved = projectRepository.save(project);

        return ProjectMapper.transformEntityToResponse(projectSaved);
    }

    @Override
    public void deleteById(Long id) {

        findByIdOrThrowNotFoundException(id);
        projectRepository.deleteById(id);

    }

    private Project findByIdOrThrowNotFoundException(Long id){
        return projectRepository.findById(id).orElseThrow( () ->
                new EntityNotFoundException("Project with ID " + id + " not found")
        );
    }
}
