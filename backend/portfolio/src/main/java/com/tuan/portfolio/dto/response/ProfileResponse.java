package com.tuan.portfolio.dto.response;

import lombok.Data;

@Data
public class ProfileResponse {
    private Long id;
    private String fullName;
    private String title;
    private String aboutMe;
    private String githubUrl;
    private String linkedinUrl;
}