package com.ai.resume.dto.request;

import com.ai.resume.enums.ProficiencyLevel;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequest {
    @NotBlank(message = "Skill name is required")
    private String name;
    private ProficiencyLevel proficiency;
    private String category;
    private Integer displayOrder;
}
