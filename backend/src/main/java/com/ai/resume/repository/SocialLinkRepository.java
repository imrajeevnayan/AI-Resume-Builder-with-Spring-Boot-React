package com.ai.resume.repository;

import com.ai.resume.entity.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
    List<SocialLink> findByResumeIdOrderByDisplayOrderAsc(Long resumeId);
    void deleteByResumeId(Long resumeId);
}
