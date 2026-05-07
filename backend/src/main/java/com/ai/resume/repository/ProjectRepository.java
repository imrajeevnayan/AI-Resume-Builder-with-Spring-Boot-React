package com.ai.resume.repository;

import com.ai.resume.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);
    void deleteByResumeId(Long resumeId);
}
