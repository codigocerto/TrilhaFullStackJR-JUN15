package com.claudionetto.codigo_certo_fullstack.controllers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.services.UserProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/users/{user-id}/projects")
@RequiredArgsConstructor
public class UserProjectController {

    private final UserProjectService userProjectService;

    @GetMapping
    public ResponseEntity<Page<ProjectResponseDTO>> findAllProjectsByUser(@PathVariable(name = "user-id") UUID userId,
                                                                          Pageable pageable) {
        Page<ProjectResponseDTO> userProjectsPage = userProjectService.findAllProjectsByUser(userId, pageable);
        return ResponseEntity.ok(userProjectsPage);
    }

    @GetMapping("/{project-id}")
    public ResponseEntity<ProjectResponseDTO> findUserProjectById(@PathVariable(name = "user-id") UUID userId,
                                                                  @PathVariable(name = "project-id") Long projectId){

        ProjectResponseDTO userProject = userProjectService.findUserProjectById(userId, projectId);
        return ResponseEntity.ok(userProject);
    }

    @PostMapping
    public ResponseEntity<Void> saveUserProject(@PathVariable(name = "user-id") UUID userId,
                                                @RequestBody @Valid ProjectRequestDTO projectRequestDTO){

        ProjectResponseDTO project = userProjectService.saveUserProject(userId, projectRequestDTO);

        return ResponseEntity.created(URI.create("/users/" + userId + "/projects/" + project.id())).build();
    }

    @PutMapping("/{project-id}")
    public ResponseEntity<ProjectResponseDTO> updateUserProject(@PathVariable(name = "user-id") UUID userId,
                                                                @PathVariable(name = "project-id") Long projectId,
                                                                @RequestBody @Valid ProjectRequestDTO projectRequestDTO){

        ProjectResponseDTO userProject = userProjectService.updateUserProject(userId, projectId, projectRequestDTO);
        return ResponseEntity.ok(userProject);
    }

    @DeleteMapping("/{project-id}")
    public ResponseEntity<Void> updateUserProject(@PathVariable(name = "user-id") UUID userId,
                                                  @PathVariable(name = "project-id") Long projectId){

        userProjectService.deleteUserProjectById(userId, projectId);
        return ResponseEntity.noContent().build();
    }


}
