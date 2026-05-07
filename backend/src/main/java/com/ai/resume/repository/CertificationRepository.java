package com.ai.resume.repository;

import com.ai.resume.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);
    void deleteByResumeId(Long resumeId);
}
