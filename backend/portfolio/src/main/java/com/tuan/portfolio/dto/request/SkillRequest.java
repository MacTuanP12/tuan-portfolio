package com.tuan.portfolio.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SkillRequest {
    @NotBlank(message = "Tên kỹ năng không được để trống!")
    private String name;

    @NotBlank(message = "Phân loại kỹ năng đi bro (VD: Backend, Core CS...)")
    private String category;
}

