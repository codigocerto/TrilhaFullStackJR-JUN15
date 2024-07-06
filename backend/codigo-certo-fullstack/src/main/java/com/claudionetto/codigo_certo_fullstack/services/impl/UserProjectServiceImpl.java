package com.claudionetto.codigo_certo_fullstack.services.impl;

import com.claudionetto.codigo_certo_fullstack.config.security.SecurityUtils;
import com.claudionetto.codigo_certo_fullstack.dtos.mappers.ProjectMapper;
import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.exceptions.EntityNotFoundException;
import com.claudionetto.codigo_certo_fullstack.exceptions.ProjectNotBelongToUserException;
import com.claudionetto.codigo_certo_fullstack.exceptions.ResourceAccessDeniedException;
import com.claudionetto.codigo_certo_fullstack.exceptions.UserNotFoundException;
import com.claudionetto.codigo_certo_fullstack.models.entities.Project;
import com.claudionetto.codigo_certo_fullstack.models.entities.User;
import com.claudionetto.codigo_certo_fullstack.repositories.ProjectRepository;
import com.claudionetto.codigo_certo_fullstack.repositories.UserRepository;
import com.claudionetto.codigo_certo_fullstack.services.UserProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserProjectServiceImpl implements UserProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Override
    public Page<ProjectResponseDTO> findAllProjectsByUser(UUID userId, Pageable pageable) {

        User user = findUserByIdOrThrowException(userId);

        Page<Project> userProjects = projectRepository.findByUser(user, pageable);
        return userProjects.map(ProjectMapper::transformEntityToResponse);
    }

    @Override
    public ProjectResponseDTO findUserProjectById(UUID userId, Long projectId) {

        User user = findUserByIdOrThrowException(userId);
        Project project = findProjectByIdOrThrowException(projectId);

        validateProjectBelongToUserOrThrowException(project, user);

        return ProjectMapper.transformEntityToResponse(project);
    }

    @Override
    public ProjectResponseDTO saveUserProject(UUID userId, ProjectRequestDTO projectRequestDTO) {
        User user = findUserByIdOrThrowException(userId);
        Project project = ProjectMapper.transformRequestToEntity(projectRequestDTO, user);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);

        Project projectSaved = projectRepository.save(project);

        return ProjectMapper.transformEntityToResponse(projectSaved);
    }

    @Override
    public ProjectResponseDTO updateUserProject(UUID userId, Long projectId, ProjectRequestDTO projectRequestDTO) {

        Project project = findProjectByIdOrThrowException(projectId);
        User user = findUserByIdOrThrowException(userId);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);
        validateProjectBelongToUserOrThrowException(project, user);

        if (projectRequestDTO.name() != null){
            project.setName(projectRequestDTO.name());
        }
        if (projectRequestDTO.description() != null){
            project.setDescription(projectRequestDTO.description());
        }
        if (projectRequestDTO.projectStatus() != null){
            project.setProjectStatus(projectRequestDTO.projectStatus());
        }

        Project projectUpdated = projectRepository.save(project);

        return ProjectMapper.transformEntityToResponse(projectUpdated);
    }

    @Override
    public void deleteUserProjectById(UUID userId, Long projectId) {

        Project project = findProjectByIdOrThrowException(projectId);
        User user = findUserByIdOrThrowException(userId);

        validateUserAuthenticatedIsTheSameOfTheIdReceived(user);
        validateProjectBelongToUserOrThrowException(project, user);

        projectRepository.deleteById(projectId);
    }

    private User findUserByIdOrThrowException(UUID id){
        return userRepository.findById(id).orElseThrow(() ->
                new UserNotFoundException("User with ID " + id + " not found"));
    }

    private Project findProjectByIdOrThrowException(Long id){
        return projectRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("Project with ID " + id + " not found"));
    }

    private void validateProjectBelongToUserOrThrowException(Project project, User user){
        if (!(project.getUser().getId().equals(user.getId()))){
            throw new ProjectNotBelongToUserException("The project with id " + project.getId() +
                    " not belong to user with id "+ user.getId());
        }
    }

    private void validateUserAuthenticatedIsTheSameOfTheIdReceived(User user) {
        String currentUsername = SecurityUtils.getCurrentUsername();

        if (!(user.getUsername().equals(currentUsername))) {
            throw new ResourceAccessDeniedException("User only can create, update or delete projects with their id");
        }
    }
}
