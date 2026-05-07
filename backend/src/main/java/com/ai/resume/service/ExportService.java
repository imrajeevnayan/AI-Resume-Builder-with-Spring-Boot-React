package com.ai.resume.service;

import com.ai.resume.dto.response.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
@Slf4j
public class ExportService {

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .enable(SerializationFeature.INDENT_OUTPUT);

    public byte[] generatePdf(ResumeResponse resume) {
        try {
            // Create a simple PDF content (HTML-based for now)
            String htmlContent = buildHtmlResume(resume);
            return htmlContent.getBytes();
        } catch (Exception e) {
            log.error("Error generating PDF: {}", e.getMessage());
            throw new RuntimeException("Failed to generate PDF", e);
        }
    }

    private String buildHtmlResume(ResumeResponse resume) {
        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>").append(resume.getTitle()).append("</title>");
        html.append("<style>");
        html.append("body{font-family:Arial,sans-serif;margin:40px;line-height:1.6;}");
        html.append("h1{color:#333;border-bottom:2px solid #007bff;padding-bottom:10px;}");
        html.append(".section{margin-bottom:25px;}");
        html.append(".contact-info{color:#666;font-size:14px;}");
        html.append("</style></head><body>");

        // Header
        html.append("<div class='header'><h1>").append(resume.getTitle()).append("</h1>");
        if (resume.getPersonalDetails() != null) {
            PersonalDetailsResponse details = resume.getPersonalDetails();
            html.append("<div class='contact-info'>");
            html.append("<strong>").append(details.getFullName()).append("</strong><br>");
            html.append(details.getEmail()).append("<br>");
            html.append(details.getPhone()).append("<br>");
            html.append(details.getLocation()).append("</div>");
        }
        html.append("</div>");

        // Summary
        if (resume.getProfessionalSummary() != null) {
            html.append("<div class='section'><h2>Professional Summary</h2>");
            html.append("<p>").append(resume.getProfessionalSummary().getSummary()).append("</p></div>");
        }

        // Skills
        if (resume.getSkills() != null && !resume.getSkills().isEmpty()) {
            html.append("<div class='section'><h2>Skills</h2><ul>");
            for (SkillResponse skill : resume.getSkills()) {
                html.append("<li><strong>").append(skill.getName()).append("</strong> - ")
                    .append(skill.getProficiency()).append("</li>");
            }
            html.append("</ul></div>");
        }

        // Work Experience
        if (resume.getWorkExperiences() != null && !resume.getWorkExperiences().isEmpty()) {
            html.append("<div class='section'><h2>Work Experience</h2>");
            for (WorkExperienceResponse work : resume.getWorkExperiences()) {
                html.append("<div><strong>").append(work.getCompany()).append("</strong> - ")
                    .append(work.getPosition()).append("<br>");
                html.append(work.getSummary()).append("</div>");
            }
            html.append("</div>");
        }

        html.append("</body></html>");
        return html.toString();
    }

    public Map<String, Object> preparePrintData(ResumeResponse resume) {
        Map<String, Object> printData = new LinkedHashMap<>();
        printData.put("title", resume.getTitle());
        printData.put("template", resume.getTemplateType());
        printData.put("generatedAt", java.time.LocalDateTime.now().toString());
        printData.put("content", resume);
        return printData;
    }
}
