package com.ai.resume.controller;

import com.ai.resume.dto.request.*;
import com.ai.resume.dto.response.*;
import com.ai.resume.service.ResumeSectionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sections")
@RequiredArgsConstructor
@Tag(name = "Resume Sections", description = "APIs for managing resume sections")
@CrossOrigin(origins = "*")
public class ResumeSectionController {

    private final ResumeSectionService sectionService;

    // Personal Details
    @PostMapping("/resumes/{resumeId}/personal-details")
    @Operation(summary = "Add personal details to resume")
    public ResponseEntity<PersonalDetailsResponse> addPersonalDetails(
            @PathVariable Long resumeId,
            @Valid @RequestBody PersonalDetailsRequest request) {
        PersonalDetailsResponse response = sectionService.addPersonalDetails(resumeId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/personal-details/{id}")
    @Operation(summary = "Update personal details")
    public ResponseEntity<PersonalDetailsResponse> updatePersonalDetails(@PathVariable Long id, @RequestBody PersonalDetailsRequest request) {
        return ResponseEntity.ok(sectionService.updatePersonalDetails(id, request));
    }

    // Professional Summary
    @PostMapping("/resumes/{resumeId}/professional-summary")
    @Operation(summary = "Add professional summary")
    public ResponseEntity<ProfessionalSummaryResponse> addProfessionalSummary(@PathVariable Long resumeId, @RequestBody ProfessionalSummaryRequest request) {
        ProfessionalSummaryResponse response = sectionService.addProfessionalSummary(resumeId, request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/professional-summary/{id}")
    @Operation(summary = "Update professional summary")
    public ResponseEntity<ProfessionalSummaryResponse> updateProfessionalSummary(@PathVariable Long id, @RequestBody ProfessionalSummaryRequest request) {
        return ResponseEntity.ok(sectionService.updateProfessionalSummary(id, request));
    }

    // Work Experience
    @PostMapping("/resumes/{resumeId}/work-experiences")
    @Operation(summary = "Add work experience")
    public ResponseEntity<WorkExperienceResponse> addWorkExperience(@PathVariable Long resumeId, @Valid @RequestBody WorkExperienceRequest request) {
        return new ResponseEntity<>(sectionService.addWorkExperience(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/work-experiences/{id}")
    @Operation(summary = "Update work experience")
    public ResponseEntity<WorkExperienceResponse> updateWorkExperience(@PathVariable Long id, @Valid @RequestBody WorkExperienceRequest request) {
        return ResponseEntity.ok(sectionService.updateWorkExperience(id, request));
    }

    @DeleteMapping("/work-experiences/{id}")
    @Operation(summary = "Delete work experience")
    public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long id) {
        sectionService.deleteWorkExperience(id);
        return ResponseEntity.noContent().build();
    }

    // Education
    @PostMapping("/resumes/{resumeId}/educations")
    @Operation(summary = "Add education")
    public ResponseEntity<EducationResponse> addEducation(@PathVariable Long resumeId, @Valid @RequestBody EducationRequest request) {
        return new ResponseEntity<>(sectionService.addEducation(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/educations/{id}")
    @Operation(summary = "Update education")
    public ResponseEntity<EducationResponse> updateEducation(@PathVariable Long id, @Valid @RequestBody EducationRequest request) {
        return ResponseEntity.ok(sectionService.updateEducation(id, request));
    }

    @DeleteMapping("/educations/{id}")
    @Operation(summary = "Delete education")
    public ResponseEntity<Void> deleteEducation(@PathVariable Long id) {
        sectionService.deleteEducation(id);
        return ResponseEntity.noContent().build();
    }

    // Skills
    @PostMapping("/resumes/{resumeId}/skills")
    @Operation(summary = "Add skill")
    public ResponseEntity<SkillResponse> addSkill(@PathVariable Long resumeId, @Valid @RequestBody SkillRequest request) {
        return new ResponseEntity<>(sectionService.addSkill(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/skills/{id}")
    @Operation(summary = "Update skill")
    public ResponseEntity<SkillResponse> updateSkill(@PathVariable Long id, @Valid @RequestBody SkillRequest request) {
        return ResponseEntity.ok(sectionService.updateSkill(id, request));
    }

    @DeleteMapping("/skills/{id}")
    @Operation(summary = "Delete skill")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long id) {
        sectionService.deleteSkill(id);
        return ResponseEntity.noContent().build();
    }

    // Projects
    @PostMapping("/resumes/{resumeId}/projects")
    @Operation(summary = "Add project")
    public ResponseEntity<ProjectResponse> addProject(@PathVariable Long resumeId, @Valid @RequestBody ProjectRequest request) {
        return new ResponseEntity<>(sectionService.addProject(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/projects/{id}")
    @Operation(summary = "Update project")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long id, @Valid @RequestBody ProjectRequest request) {
        return ResponseEntity.ok(sectionService.updateProject(id, request));
    }

    @DeleteMapping("/projects/{id}")
    @Operation(summary = "Delete project")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        sectionService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    // Certifications
    @PostMapping("/resumes/{resumeId}/certifications")
    @Operation(summary = "Add certification")
    public ResponseEntity<CertificationResponse> addCertification(@PathVariable Long resumeId, @Valid @RequestBody CertificationRequest request) {
        return new ResponseEntity<>(sectionService.addCertification(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/certifications/{id}")
    @Operation(summary = "Update certification")
    public ResponseEntity<CertificationResponse> updateCertification(@PathVariable Long id, @Valid @RequestBody CertificationRequest request) {
        return ResponseEntity.ok(sectionService.updateCertification(id, request));
    }

    @DeleteMapping("/certifications/{id}")
    @Operation(summary = "Delete certification")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        sectionService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }

    // Languages
    @PostMapping("/resumes/{resumeId}/languages")
    @Operation(summary = "Add language")
    public ResponseEntity<LanguageResponse> addLanguage(@PathVariable Long resumeId, @Valid @RequestBody LanguageRequest request) {
        return new ResponseEntity<>(sectionService.addLanguage(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/languages/{id}")
    @Operation(summary = "Update language")
    public ResponseEntity<LanguageResponse> updateLanguage(@PathVariable Long id, @Valid @RequestBody LanguageRequest request) {
        return ResponseEntity.ok(sectionService.updateLanguage(id, request));
    }

    @DeleteMapping("/languages/{id}")
    @Operation(summary = "Delete language")
    public ResponseEntity<Void> deleteLanguage(@PathVariable Long id) {
        sectionService.deleteLanguage(id);
        return ResponseEntity.noContent().build();
    }

    // Social Links
    @PostMapping("/resumes/{resumeId}/social-links")
    @Operation(summary = "Add social link")
    public ResponseEntity<SocialLinkResponse> addSocialLink(@PathVariable Long resumeId, @Valid @RequestBody SocialLinkRequest request) {
        return new ResponseEntity<>(sectionService.addSocialLink(resumeId, request), HttpStatus.CREATED);
    }

    @PutMapping("/social-links/{id}")
    @Operation(summary = "Update social link")
    public ResponseEntity<SocialLinkResponse> updateSocialLink(@PathVariable Long id, @Valid @RequestBody SocialLinkRequest request) {
        return ResponseEntity.ok(sectionService.updateSocialLink(id, request));
    }

    @DeleteMapping("/social-links/{id}")
    @Operation(summary = "Delete social link")
    public ResponseEntity<Void> deleteSocialLink(@PathVariable Long id) {
        sectionService.deleteSocialLink(id);
        return ResponseEntity.noContent().build();
    }
}
