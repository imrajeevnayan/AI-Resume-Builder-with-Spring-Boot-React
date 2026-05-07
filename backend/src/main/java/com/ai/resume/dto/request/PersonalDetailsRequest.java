package com.ai.resume.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetailsRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Valid email is required")
    private String email;

    private String phone;
    private String address;
    private String website;
    private String linkedIn;
    private String github;
    private String photoUrl;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String city;
    private String state;
    private String country;
}
