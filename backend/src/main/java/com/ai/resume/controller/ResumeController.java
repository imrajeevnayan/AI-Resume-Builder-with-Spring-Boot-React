package com.ai.resume.controller;

import com.ai.resume.dto.request.ResumeCreateRequest;
import com.ai.resume.dto.request.ResumeUpdateRequest;
import com.ai.resume.dto.response.ResumeResponse;
import com.ai.resume.entity.Resume;
import com.ai.resume.enums.ResumeStatus;
import com.ai.resume.enums.TemplateType;
import com.ai.resume.mapper.ResumeMapper;
import com.ai.resume.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/resumes")
@RequiredArgsConstructor
@Tag(name = "Resume Management", description = "APIs for creating, updating, and managing resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    private final ResumeService resumeService;
    private final ResumeMapper resumeMapper;

    @PostMapping
    @Operation(summary = "Create a new resume", description = "Create a new resume with title and template type")
    public ResponseEntity<ResumeResponse> createResume(@Valid @RequestBody ResumeCreateRequest request) {
        ResumeResponse createdResume = resumeService.createResume(request);
        return new ResponseEntity<>(createdResume, HttpStatus.CREATED);
    }

    @GetMapping
    @Operation(summary = "Get all resumes", description = "Retrieve all non-draft resumes")
    public ResponseEntity<List<ResumeResponse>> getAllResumes() {
        List<Resume> resumes = resumeService.getAllResumes();
        return ResponseEntity.ok(resumeMapper.toResumeResponseList(resumes));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get resume by ID", description = "Retrieve a specific resume by its ID")
    public ResponseEntity<ResumeResponse> getResumeById(@PathVariable Long id) {
        ResumeResponse resume = resumeService.getResumeById(id);
        return ResponseEntity.ok(resume);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update resume", description = "Update the title and template of a resume")
    public ResponseEntity<ResumeResponse> updateResume(@PathVariable Long id, @Valid @RequestBody ResumeUpdateRequest request) {
        ResumeResponse updated = resumeService.updateResume(id, request);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete resume", description = "Permanently delete a resume")
    public ResponseEntity<Void> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/duplicate")
    @Operation(summary = "Duplicate resume", description = "Create a copy of an existing resume")
    public ResponseEntity<ResumeResponse> duplicateResume(@PathVariable Long id) {
        ResumeResponse duplicated = resumeService.duplicateResume(id);
        return new ResponseEntity<>(duplicated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/template")
    @Operation(summary = "Change resume template", description = "Change the template type of a resume")
    public ResponseEntity<ResumeResponse> changeTemplate(@PathVariable Long id, @RequestParam TemplateType templateType) {
        ResumeResponse updated = resumeService.changeTemplate(id, templateType);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/publish")
    @Operation(summary = "Publish resume", description = "Mark a resume as ready (non-draft)")
    public ResponseEntity<ResumeResponse> publishResume(@PathVariable Long id) {
        ResumeResponse updated = resumeService.publishResume(id);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/draft")
    @Operation(summary = "Set resume as draft", description = "Mark a resume as draft")
    public ResponseEntity<ResumeResponse> draftResume(@PathVariable Long id) {
        ResumeResponse updated = resumeService.draftResume(id);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/search")
    @Operation(summary = "Search resumes", description = "Search resumes by title")
    public ResponseEntity<List<ResumeResponse>> searchResumes(@RequestParam String query) {
        List<Resume> resumes = resumeService.searchResumes(query);
        return ResponseEntity.ok(resumeMapper.toResumeResponseList(resumes));
    }

    @GetMapping("/template/{templateType}")
    @Operation(summary = "Get resumes by template", description = "Filter resumes by template type")
    public ResponseEntity<List<ResumeResponse>> getByTemplate(@PathVariable TemplateType templateType) {
        List<Resume> resumes = resumeService.getResumesByTemplate(templateType);
        return ResponseEntity.ok(resumeMapper.toResumeResponseList(resumes));
    }

    @GetMapping("/status/{status}")
    @Operation(summary = "Get resumes by status", description = "Filter resumes by status")
    public ResponseEntity<List<ResumeResponse>> getByStatus(@PathVariable ResumeStatus status) {
        List<Resume> resumes = resumeService.getResumesByStatus(status);
        return ResponseEntity.ok(resumeMapper.toResumeResponseList(resumes));
    }
}
