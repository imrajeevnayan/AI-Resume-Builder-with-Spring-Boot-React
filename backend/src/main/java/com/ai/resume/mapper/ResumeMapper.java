package com.ai.resume.mapper;

import com.ai.resume.dto.request.*;
import com.ai.resume.dto.response.*;
import com.ai.resume.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ResumeMapper {

    ResumeMapper INSTANCE = Mappers.getMapper(ResumeMapper.class);

    ResumeResponse toResumeResponse(Resume resume);

    List<ResumeResponse> toResumeResponseList(List<Resume> resumes);

    // Personal Details
    PersonalDetailsResponse toPersonalDetailsResponse(PersonalDetails personalDetails);

    PersonalDetails toPersonalDetails(PersonalDetailsRequest request);

    void updatePersonalDetails(@MappingTarget PersonalDetails entity, PersonalDetailsRequest request);

    // Professional Summary
    ProfessionalSummaryResponse toProfessionalSummaryResponse(ProfessionalSummary summary);

    ProfessionalSummary toProfessionalSummary(ProfessionalSummaryRequest request);

    void updateProfessionalSummary(@MappingTarget ProfessionalSummary entity, ProfessionalSummaryRequest request);

    // Work Experience
    WorkExperienceResponse toWorkExperienceResponse(WorkExperience workExperience);

    WorkExperience toWorkExperience(WorkExperienceRequest request);

    void updateWorkExperience(@MappingTarget WorkExperience entity, WorkExperienceRequest request);

    List<WorkExperienceResponse> toWorkExperienceResponseList(List<WorkExperience> workExperiences);

    // Education
    EducationResponse toEducationResponse(Education education);

    Education toEducation(EducationRequest request);

    void updateEducation(@MappingTarget Education entity, EducationRequest request);

    List<EducationResponse> toEducationResponseList(List<Education> educations);

    // Skill
    SkillResponse toSkillResponse(Skill skill);

    Skill toSkill(SkillRequest request);

    void updateSkill(@MappingTarget Skill entity, SkillRequest request);

    List<SkillResponse> toSkillResponseList(List<Skill> skills);

    // Project
    ProjectResponse toProjectResponse(Project project);

    Project toProject(ProjectRequest request);

    void updateProject(@MappingTarget Project entity, ProjectRequest request);

    List<ProjectResponse> toProjectResponseList(List<Project> projects);

    // Certification
    CertificationResponse toCertificationResponse(Certification certification);

    Certification toCertification(CertificationRequest request);

    void updateCertification(@MappingTarget Certification entity, CertificationRequest request);

    List<CertificationResponse> toCertificationResponseList(List<Certification> certifications);

    // Language
    LanguageResponse toLanguageResponse(Language language);

    Language toLanguage(LanguageRequest request);

    void updateLanguage(@MappingTarget Language entity, LanguageRequest request);

    List<LanguageResponse> toLanguageResponseList(List<Language> languages);

    // Social Link
    SocialLinkResponse toSocialLinkResponse(SocialLink socialLink);

    SocialLink toSocialLink(SocialLinkRequest request);

    void updateSocialLink(@MappingTarget SocialLink entity, SocialLinkRequest request);

    List<SocialLinkResponse> toSocialLinkResponseList(List<SocialLink> socialLinks);
}
