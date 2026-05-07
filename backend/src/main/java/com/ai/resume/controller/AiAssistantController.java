package com.ai.resume.controller;

import com.ai.resume.service.AiAssistantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@Tag(name = "AI Assistant", description = "AI-powered features for resume optimization")
@CrossOrigin(origins = "*")
public class AiAssistantController {

    private final AiAssistantService aiAssistantService;

    @PostMapping("/generate-summary")
    @Operation(summary = "Generate professional summary", description = "AI-generated professional summary based on role and skills")
    public ResponseEntity<Map<String, String>> generateSummary(@RequestBody Map<String, Object> request) {
        String role = (String) request.getOrDefault("role", "Software Engineer");
        Integer years = (Integer) request.getOrDefault("yearsOfExperience", 3);
        List<String> skills = (List<String>) request.getOrDefault("skills", List.of());

        String summary = aiAssistantService.generateProfessionalSummary(role, years, skills);
        return ResponseEntity.ok(Map.of("summary", summary));
    }

    @PostMapping("/enhance-bullets")
    @Operation(summary = "Enhance bullet points", description = "AI-enhance bullet points for impact")
    public ResponseEntity<Map<String, List<String>>> enhanceBullets(@RequestBody Map<String, List<String>> request) {
        List<String> bullets = request.get("bulletPoints");
        List<String> enhanced = aiAssistantService.enhanceBulletPoints(bullets);
        return ResponseEntity.ok(Map.of("enhancedBullets", enhanced));
    }

    @PostMapping("/suggest-skills")
    @Operation(summary = "Suggest skills", description = "AI-suggested skills based on role")
    public ResponseEntity<Map<String, List<String>>> suggestSkills(@RequestBody Map<String, Object> request) {
        String role = (String) request.getOrDefault("role", "Software Engineer");
        List<String> currentSkills = (List<String>) request.getOrDefault("currentSkills", List.of());

        List<String> suggestions = aiAssistantService.suggestSkills(role, currentSkills);
        return ResponseEntity.ok(Map.of("suggestions", suggestions));
    }

    @PostMapping("/optimize-ats")
    @Operation(summary = "ATS optimization", description = "Get ATS optimization suggestions")
    public ResponseEntity<Map<String, Object>> optimizeAts(@RequestBody Map<String, String> request) {
        String content = request.getOrDefault("content", "");
        List<String> missingKeywords = aiAssistantService.optimizeForAts(content);
        return ResponseEntity.ok(Map.of(
                "missingKeywords", missingKeywords,
                "score", 100 - missingKeywords.size()
        ));
    }

    @PostMapping("/keyword-recommendations")
    @Operation(summary = "Keyword recommendations", description = "Get keyword recommendations for a job description")
    public ResponseEntity<Map<String, List<String>>> suggestKeywords(@RequestBody Map<String, String> request) {
        String jobDescription = request.getOrDefault("jobDescription", "");
        List<String> keywords = aiAssistantService.suggestKeywords(jobDescription);
        return ResponseEntity.ok(Map.of("keywords", keywords));
    }

    @PostMapping("/role-specific-skills")
    @Operation(summary = "Role-specific skill suggestions", description = "Get skills for a specific role and level")
    public ResponseEntity<Map<String, List<String>>> getRoleSkills(@RequestBody Map<String, String> request) {
        String role = request.getOrDefault("role", "Software Engineer");
        String level = request.getOrDefault("level", "Mid-level");
        List<String> skills = aiAssistantService.generateSkillSuggestions(role, level);
        return ResponseEntity.ok(Map.of("skills", skills));
    }
}
