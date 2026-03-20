package com.tuan.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProfileRequest {

    @NotBlank(message = "Tên không được để trống!")
    private String fullName;

    @NotBlank(message = "Nhập chức danh/định hướng công việc vào bro.")
    private String title;

    @NotBlank(message = "Viết vài dòng giới thiệu bản thân đi!")
    private String aboutMe;

    private String githubUrl;
    private String linkedinUrl;
}