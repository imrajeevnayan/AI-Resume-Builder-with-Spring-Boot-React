package com.ai.resume.repository;

import com.ai.resume.entity.Resume;
import com.ai.resume.enums.ResumeStatus;
import com.ai.resume.enums.TemplateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {

    @Query("SELECT r FROM Resume r LEFT JOIN FETCH r.personalDetails WHERE r.isDraft = false")
    List<Resume> findAllNonDraftResumes();

    @Query("SELECT r FROM Resume r LEFT JOIN FETCH r.personalDetails WHERE r.templateType = :templateType AND r.isDraft = false")
    List<Resume> findByTemplateType(TemplateType templateType);

    @Query("SELECT r FROM Resume r LEFT JOIN FETCH r.personalDetails WHERE r.status = :status AND r.isDraft = false")
    List<Resume> findByStatus(ResumeStatus status);

    @Query("SELECT r FROM Resume r LEFT JOIN FETCH r.personalDetails WHERE r.title LIKE %:query% AND r.isDraft = false")
    List<Resume> searchByTitle(@Param("query") String query);

    @Query("SELECT r FROM Resume r LEFT JOIN FETCH r.personalDetails WHERE r.id = :id")
    java.util.Optional<Resume> findByIdWithDetails(@Param("id") Long id);
}
