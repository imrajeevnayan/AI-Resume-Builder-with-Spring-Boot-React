package com.ai.resume.dto.response;

import com.ai.resume.enums.ResumeStatus;
import com.ai.resume.enums.TemplateType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeResponse {
    private Long id;
    private String title;
    private TemplateType templateType;
    private ResumeStatus status;
    private Boolean isDraft;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private PersonalDetailsResponse personalDetails;
    private ProfessionalSummaryResponse professionalSummary;
    private List<WorkExperienceResponse> workExperiences;
    private List<EducationResponse> educations;
    private List<SkillResponse> skills;
    private List<ProjectResponse> projects;
    private List<CertificationResponse> certifications;
    private List<LanguageResponse> languages;
    private List<SocialLinkResponse> socialLinks;
}
