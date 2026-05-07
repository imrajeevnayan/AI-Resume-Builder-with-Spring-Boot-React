package com.ai.resume.controller;

import com.ai.resume.dto.response.ResumeResponse;
import com.ai.resume.service.ExportService;
import com.ai.resume.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/resumes/{resumeId}/export")
@RequiredArgsConstructor
@Tag(name = "Export", description = "Export resume to various formats")
@CrossOrigin(origins = "*")
public class ExportController {

    private final ExportService exportService;
    private final ResumeService resumeService;

    @GetMapping("/pdf")
    @Operation(summary = "Export to PDF", description = "Export resume as PDF document")
    public ResponseEntity<byte[]> exportToPdf(@PathVariable Long resumeId) {
        ResumeResponse resume = resumeService.getResumeById(resumeId);
        byte[] pdfBytes = exportService.generatePdf(resume);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", resume.getTitle().replaceAll("\\s+", "_") + "_resume.pdf");

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

    @GetMapping("/json")
    @Operation(summary = "Export to JSON", description = "Export resume as JSON data")
    public ResponseEntity<ResumeResponse> exportToJson(@PathVariable Long resumeId) {
        ResumeResponse resume = resumeService.getResumeById(resumeId);
        return ResponseEntity.ok(resume);
    }

    @GetMapping("/print")
    @Operation(summary = "Get print-friendly data", description = "Get resume data optimized for printing")
    public ResponseEntity<Map<String, Object>> getPrintData(@PathVariable Long resumeId) {
        ResumeResponse resume = resumeService.getResumeById(resumeId);
        Map<String, Object> printData = exportService.preparePrintData(resume);
        return ResponseEntity.ok(printData);
    }
}
