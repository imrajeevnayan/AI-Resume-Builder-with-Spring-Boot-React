package com.ai.resume.dto.request;

import com.ai.resume.enums.TemplateType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResumeCreateRequest {
    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Template type is required")
    private TemplateType templateType;
}
