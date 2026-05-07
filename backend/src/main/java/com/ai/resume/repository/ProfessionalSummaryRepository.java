package com.ai.resume.repository;

import com.ai.resume.entity.ProfessionalSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfessionalSummaryRepository extends JpaRepository<ProfessionalSummary, Long> {
}
