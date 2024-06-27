package com.claudionetto.codigo_certo_fullstack.controllers;

import com.claudionetto.codigo_certo_fullstack.dtos.requests.ProjectRequestDTO;
import com.claudionetto.codigo_certo_fullstack.dtos.responses.ProjectResponseDTO;
import com.claudionetto.codigo_certo_fullstack.services.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<Page<ProjectResponseDTO>> findAll(Pageable pageable){
        Page<ProjectResponseDTO> projectsPage = projectService.findAll(pageable);

        return ResponseEntity.ok(projectsPage);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> findById(@PathVariable(name = "id") Long id){
        ProjectResponseDTO project = projectService.findById(id);

        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid ProjectRequestDTO projectRequestDTO){
        ProjectResponseDTO project = projectService.save(projectRequestDTO);

        return ResponseEntity.created(URI.create("/projects/" + project.id())).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponseDTO> update(@PathVariable(name = "id") Long id,
                                                     @RequestBody @Valid ProjectRequestDTO projectRequestDTO){

        ProjectResponseDTO projectResponseDTO = projectService.update(id, projectRequestDTO);
        return ResponseEntity.ok(projectResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable(name = "id") Long id){
        projectService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
