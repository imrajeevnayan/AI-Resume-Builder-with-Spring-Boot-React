package com.ai.resume.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiAssistantService {

    private static final List<String> SKILL_SUGGESTIONS = Arrays.asList(
            "Leadership", "Communication", "Problem Solving", "Agile Methodologies",
            "Team Collaboration", "Critical Thinking", "Time Management", "Project Management",
            "Data Analysis", "Machine Learning", "Cloud Computing", "DevOps", "CI/CD",
            "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud"
    );

    private static final List<String> KEYWORDS_BY_FIELD = Arrays.asList(
            "RESTful APIs", "Microservices", "React", "Angular", "Vue.js", "Spring Boot",
            "Node.js", "Python", "Java", "TypeScript", "SQL", "NoSQL", "MongoDB", "PostgreSQL",
            "GraphQL", "Kafka", "RabbitMQ", "Redis", "Elasticsearch", "Jenkins"
    );

    private static final List<String> ATS_KEYWORDS = Arrays.asList(
            "Scrum", "Kanban", "Jira", "Confluence", "Git", "GitHub", "GitLab",
            "CI/CD Pipeline", "Unit Testing", "Integration Testing", "TDD",
            "OOP", "Design Patterns", "SOLID Principles", "Clean Code",
            "Agile", "Waterfall", "SDLC"
    );

    private final Random random = new Random();

    public String generateProfessionalSummary(String role, Integer yearsOfExperience, List<String> skills) {
        StringBuilder sb = new StringBuilder();
        sb.append("Results-driven ").append(role).append(" with ")
          .append(yearsOfExperience).append("+ years of experience. ");

        if (!skills.isEmpty()) {
            sb.append("Proficient in ");
            for (int i = 0; i < Math.min(skills.size(), 5); i++) {
                sb.append(skills.get(i));
                if (i < Math.min(skills.size(), 5) - 1) {
                    sb.append(", ");
                }
            }
            sb.append(". ");
        }

        sb.append("Demonstrated ability to deliver high-quality software solutions, ");
        sb.append("collaborate effectively with cross-functional teams, and drive continuous improvement.");

        return sb.toString();
    }

    public List<String> enhanceBulletPoints(List<String> bulletPoints) {
        return bulletPoints.stream()
                .map(this::enhanceBulletPoint)
                .toList();
    }

    private String enhanceBulletPoint(String bulletPoint) {
        String trimmed = bulletPoint.trim();
        if (!trimmed.startsWith("-")) {
            trimmed = "- " + trimmed;
        }
        return trimmed + " resulting in measurable improvements and increased efficiency.";
    }

    public List<String> suggestSkills(String jobTitle, List<String> currentSkills) {
        return SKILL_SUGGESTIONS.stream()
                .filter(skill -> !currentSkills.contains(skill))
                .limit(5 + random.nextInt(3))
                .toList();
    }

    public List<String> suggestKeywords(String jobDescription) {
        return KEYWORDS_BY_FIELD.stream()
                .filter(keyword -> !jobDescription.toLowerCase().contains(keyword.toLowerCase()))
                .limit(8 + random.nextInt(5))
                .toList();
    }

    public List<String> optimizeForAts(String content) {
        return Arrays.stream(ATS_KEYWORDS.toArray(new String[0]))
                .filter(keyword -> !content.toLowerCase().contains(keyword.toLowerCase()))
                .limit(10)
                .toList();
    }

    public List<String> generateSkillSuggestions(String role, String level) {
        return switch (role.toLowerCase()) {
            case "software engineer", "developer" ->
                    List.of("Java", "Python", "JavaScript", "React", "Spring Boot", "Docker", "Kubernetes", "AWS");
            case "data scientist", "analyst" ->
                    List.of("Python", "R", "SQL", "Machine Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy");
            case "devops engineer" ->
                    List.of("Docker", "Kubernetes", "Jenkins", "AWS", "Terraform", "Ansible", "CI/CD", "Linux");
            default ->
                    List.of("Communication", "Problem Solving", "Teamwork", "Adaptability", "Critical Thinking", "Leadership");
        };
    }
}
