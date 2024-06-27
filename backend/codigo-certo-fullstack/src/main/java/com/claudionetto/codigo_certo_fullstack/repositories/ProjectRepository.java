package com.claudionetto.codigo_certo_fullstack.repositories;

import com.claudionetto.codigo_certo_fullstack.models.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
