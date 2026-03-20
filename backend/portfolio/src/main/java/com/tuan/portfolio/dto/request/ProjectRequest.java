package com.tuan.portfolio.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProjectRequest {
    @NotBlank(message = "Tên dự án không được để trống!")
    @Size(max = 100, message = "Tên dự án dài vừa thôi, tối đa 100 ký tự.")
    private String name;

    @NotBlank(message = "hãy mô tả dự án!")
    private String description;

    @NotBlank(message = "Tech stack không được để trống.")
    private String techStack;

    @Size(max = 255, message = "URL quá dài!")
    private String githubUrl;

    private String liveUrl;
    private String imageUrl;
}