package com.tuan.portfolio.dto.response;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ProfileResponse {
    private Long id;
    private String fullName;
    private String title;
    private LocalDate birthDate;
    private String education;
    private String address;
    private String aboutMe;
    private String githubUrl;
    private String linkedinUrl;
}