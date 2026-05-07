package com.ai.resume.repository;

import com.ai.resume.entity.WorkExperience;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkExperienceRepository extends JpaRepository<WorkExperience, Long> {
    List<WorkExperience> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);
    void deleteByResumeId(Long resumeId);
}
