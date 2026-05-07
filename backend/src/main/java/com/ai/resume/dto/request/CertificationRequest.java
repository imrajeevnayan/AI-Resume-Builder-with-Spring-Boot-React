package com.ai.resume.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificationRequest {
    @NotBlank(message = "Certification name is required")
    private String name;

    private String issuer;
    private LocalDate issueDate;
    private LocalDate expiryDate;
    private String url;
    private Integer displayOrder;
}
