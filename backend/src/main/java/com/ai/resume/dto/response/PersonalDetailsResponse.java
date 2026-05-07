package com.ai.resume.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetailsResponse {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String website;
    private String linkedIn;
    private String github;
    private String photoUrl;
    private String jobTitle;
    private String city;
    private String state;
    private String country;
}
