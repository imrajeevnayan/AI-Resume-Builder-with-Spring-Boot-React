package com.ai.resume.repository;

import com.ai.resume.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    List<Language> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);
    void deleteByResumeId(Long resumeId);
}
