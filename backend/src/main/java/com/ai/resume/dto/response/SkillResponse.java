package com.ai.resume.dto.response;

import com.ai.resume.enums.ProficiencyLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillResponse {
    private Long id;
    private String name;
    private ProficiencyLevel proficiency;
    private String category;
    private Integer displayOrder;
}
