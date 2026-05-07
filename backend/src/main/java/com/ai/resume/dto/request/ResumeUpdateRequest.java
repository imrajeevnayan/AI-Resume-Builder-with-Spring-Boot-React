package com.ai.resume.dto.request;

import com.ai.resume.enums.TemplateType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeUpdateRequest {
    @NotBlank(message = "Title is required")
    private String title;
    private TemplateType templateType;
}
