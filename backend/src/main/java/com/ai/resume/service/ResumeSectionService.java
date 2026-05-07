package com.ai.resume.service;

import com.ai.resume.dto.request.*;
import com.ai.resume.dto.response.*;
import com.ai.resume.entity.*;
import com.ai.resume.exception.ResourceNotFoundException;
import com.ai.resume.mapper.ResumeMapper;
import com.ai.resume.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ResumeSectionService {

    private final ResumeRepository resumeRepository;
    private final PersonalDetailsRepository personalDetailsRepository;
    private final ProfessionalSummaryRepository professionalSummaryRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final EducationRepository educationRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final CertificationRepository certificationRepository;
    private final LanguageRepository languageRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final ResumeMapper resumeMapper;

    // Personal Details
    @Transactional
    public PersonalDetailsResponse addPersonalDetails(Long resumeId, PersonalDetailsRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        PersonalDetails personalDetails = resumeMapper.toPersonalDetails(request);
        personalDetails.setResume(resume);
        PersonalDetails saved = personalDetailsRepository.save(personalDetails);
        return resumeMapper.toPersonalDetailsResponse(saved);
    }

    @Transactional
    public PersonalDetailsResponse updatePersonalDetails(Long detailsId, PersonalDetailsRequest request) {
        PersonalDetails existing = personalDetailsRepository.findById(detailsId)
                .orElseThrow(() -> new ResourceNotFoundException("Personal details", detailsId));

        resumeMapper.updatePersonalDetails(existing, request);
        PersonalDetails updated = personalDetailsRepository.save(existing);
        return resumeMapper.toPersonalDetailsResponse(updated);
    }

    // Professional Summary
    @Transactional
    public ProfessionalSummaryResponse addProfessionalSummary(Long resumeId, ProfessionalSummaryRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        ProfessionalSummary summary = resumeMapper.toProfessionalSummary(request);
        summary.setResume(resume);
        ProfessionalSummary saved = professionalSummaryRepository.save(summary);
        return resumeMapper.toProfessionalSummaryResponse(saved);
    }

    @Transactional
    public ProfessionalSummaryResponse updateProfessionalSummary(Long summaryId, ProfessionalSummaryRequest request) {
        ProfessionalSummary existing = professionalSummaryRepository.findById(summaryId)
                .orElseThrow(() -> new ResourceNotFoundException("Professional summary", summaryId));

        resumeMapper.updateProfessionalSummary(existing, request);
        ProfessionalSummary updated = professionalSummaryRepository.save(existing);
        return resumeMapper.toProfessionalSummaryResponse(updated);
    }

    // Work Experience
    @Transactional
    public WorkExperienceResponse addWorkExperience(Long resumeId, WorkExperienceRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        WorkExperience workExperience = resumeMapper.toWorkExperience(request);
        workExperience.setResume(resume);
        WorkExperience saved = workExperienceRepository.save(workExperience);
        return resumeMapper.toWorkExperienceResponse(saved);
    }

    @Transactional
    public WorkExperienceResponse updateWorkExperience(Long id, WorkExperienceRequest request) {
        WorkExperience existing = workExperienceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Work experience", id));

        resumeMapper.updateWorkExperience(existing, request);
        WorkExperience updated = workExperienceRepository.save(existing);
        return resumeMapper.toWorkExperienceResponse(updated);
    }

    @Transactional
    public void deleteWorkExperience(Long id) {
        if (!workExperienceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Work experience", id);
        }
        workExperienceRepository.deleteById(id);
    }

    // Education
    @Transactional
    public EducationResponse addEducation(Long resumeId, EducationRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        Education education = resumeMapper.toEducation(request);
        education.setResume(resume);
        Education saved = educationRepository.save(education);
        return resumeMapper.toEducationResponse(saved);
    }

    @Transactional
    public EducationResponse updateEducation(Long id, EducationRequest request) {
        Education existing = educationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Education", id));

        resumeMapper.updateEducation(existing, request);
        Education updated = educationRepository.save(existing);
        return resumeMapper.toEducationResponse(updated);
    }

    @Transactional
    public void deleteEducation(Long id) {
        if (!educationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Education", id);
        }
        educationRepository.deleteById(id);
    }

    // Skill
    @Transactional
    public SkillResponse addSkill(Long resumeId, SkillRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        Skill skill = resumeMapper.toSkill(request);
        skill.setResume(resume);
        Skill saved = skillRepository.save(skill);
        return resumeMapper.toSkillResponse(saved);
    }

    @Transactional
    public SkillResponse updateSkill(Long id, SkillRequest request) {
        Skill existing = skillRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Skill", id));

        resumeMapper.updateSkill(existing, request);
        Skill updated = skillRepository.save(existing);
        return resumeMapper.toSkillResponse(updated);
    }

    @Transactional
    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResourceNotFoundException("Skill", id);
        }
        skillRepository.deleteById(id);
    }

    // Project
    @Transactional
    public ProjectResponse addProject(Long resumeId, ProjectRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        Project project = resumeMapper.toProject(request);
        project.setResume(resume);
        Project saved = projectRepository.save(project);
        return resumeMapper.toProjectResponse(saved);
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", id));

        resumeMapper.updateProject(existing, request);
        Project updated = projectRepository.save(existing);
        return resumeMapper.toProjectResponse(updated);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResourceNotFoundException("Project", id);
        }
        projectRepository.deleteById(id);
    }

    // Certification
    @Transactional
    public CertificationResponse addCertification(Long resumeId, CertificationRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        Certification certification = resumeMapper.toCertification(request);
        certification.setResume(resume);
        Certification saved = certificationRepository.save(certification);
        return resumeMapper.toCertificationResponse(saved);
    }

    @Transactional
    public CertificationResponse updateCertification(Long id, CertificationRequest request) {
        Certification existing = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification", id));

        resumeMapper.updateCertification(existing, request);
        Certification updated = certificationRepository.save(existing);
        return resumeMapper.toCertificationResponse(updated);
    }

    @Transactional
    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Certification", id);
        }
        certificationRepository.deleteById(id);
    }

    // Language
    @Transactional
    public LanguageResponse addLanguage(Long resumeId, LanguageRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        Language language = resumeMapper.toLanguage(request);
        language.setResume(resume);
        Language saved = languageRepository.save(language);
        return resumeMapper.toLanguageResponse(saved);
    }

    @Transactional
    public LanguageResponse updateLanguage(Long id, LanguageRequest request) {
        Language existing = languageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language", id));

        resumeMapper.updateLanguage(existing, request);
        Language updated = languageRepository.save(existing);
        return resumeMapper.toLanguageResponse(updated);
    }

    @Transactional
    public void deleteLanguage(Long id) {
        if (!languageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Language", id);
        }
        languageRepository.deleteById(id);
    }

    // Social Link
    @Transactional
    public SocialLinkResponse addSocialLink(Long resumeId, SocialLinkRequest request) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", resumeId));

        SocialLink socialLink = resumeMapper.toSocialLink(request);
        socialLink.setResume(resume);
        SocialLink saved = socialLinkRepository.save(socialLink);
        return resumeMapper.toSocialLinkResponse(saved);
    }

    @Transactional
    public SocialLinkResponse updateSocialLink(Long id, SocialLinkRequest request) {
        SocialLink existing = socialLinkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Social link", id));

        resumeMapper.updateSocialLink(existing, request);
        SocialLink updated = socialLinkRepository.save(existing);
        return resumeMapper.toSocialLinkResponse(updated);
    }

    @Transactional
    public void deleteSocialLink(Long id) {
        if (!socialLinkRepository.existsById(id)) {
            throw new ResourceNotFoundException("Social link", id);
        }
        socialLinkRepository.deleteById(id);
    }
}
