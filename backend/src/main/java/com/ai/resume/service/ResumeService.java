package com.ai.resume.service;

import com.ai.resume.dto.request.*;
import com.ai.resume.dto.response.*;
import com.ai.resume.entity.*;
import com.ai.resume.enums.ResumeStatus;
import com.ai.resume.enums.TemplateType;
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
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final ResumeMapper resumeMapper;

    @Transactional
    public ResumeResponse createResume(ResumeCreateRequest request) {
        Resume resume = Resume.builder()
                .title(request.getTitle())
                .templateType(request.getTemplateType())
                .status(ResumeStatus.DRAFT)
                .isDraft(true)
                .build();

        Resume savedResume = resumeRepository.save(resume);
        log.info("Created resume with id: {}", savedResume.getId());
        return resumeMapper.toResumeResponse(savedResume);
    }

    public List<Resume> getAllResumes() {
        return resumeRepository.findAllNonDraftResumes();
    }

    public ResumeResponse getResumeById(Long id) {
        Resume resume = resumeRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));
        return resumeMapper.toResumeResponse(resume);
    }

    @Transactional
    public ResumeResponse updateResume(Long id, ResumeUpdateRequest request) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));

        resume.setTitle(request.getTitle());
        if (request.getTemplateType() != null) {
            resume.setTemplateType(request.getTemplateType());
        }

        Resume updatedResume = resumeRepository.save(resume);
        log.info("Updated resume with id: {}", updatedResume.getId());
        return resumeMapper.toResumeResponse(updatedResume);
    }

    @Transactional
    public void deleteResume(Long id) {
        if (!resumeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Resume", id);
        }
        resumeRepository.deleteById(id);
        log.info("Deleted resume with id: {}", id);
    }

    @Transactional
    public ResumeResponse duplicateResume(Long id) {
        Resume original = resumeRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));

        Resume duplicate = Resume.builder()
                .title(original.getTitle() + " (Copy)")
                .templateType(original.getTemplateType())
                .status(ResumeStatus.DRAFT)
                .isDraft(true)
                .build();

        Resume savedDuplicate = resumeRepository.save(duplicate);
        log.info("Duplicated resume {} to new id: {}", id, savedDuplicate.getId());
        return resumeMapper.toResumeResponse(savedDuplicate);
    }

    @Transactional
    public ResumeResponse changeTemplate(Long id, TemplateType templateType) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));

        resume.setTemplateType(templateType);
        Resume updatedResume = resumeRepository.save(resume);
        return resumeMapper.toResumeResponse(updatedResume);
    }

    @Transactional
    public ResumeResponse publishResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));

        resume.setStatus(ResumeStatus.READY);
        resume.setIsDraft(false);
        Resume updatedResume = resumeRepository.save(resume);
        return resumeMapper.toResumeResponse(updatedResume);
    }

    @Transactional
    public ResumeResponse draftResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resume", id));

        resume.setStatus(ResumeStatus.DRAFT);
        resume.setIsDraft(true);
        Resume updatedResume = resumeRepository.save(resume);
        return resumeMapper.toResumeResponse(updatedResume);
    }

    public List<Resume> searchResumes(String query) {
        return resumeRepository.searchByTitle(query);
    }

    public List<Resume> getResumesByTemplate(TemplateType templateType) {
        return resumeRepository.findByTemplateType(templateType);
    }

    public List<Resume> getResumesByStatus(ResumeStatus status) {
        return resumeRepository.findByStatus(status);
    }
}
