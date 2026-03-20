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

    @Min(value = 1, message = "Điểm thành thạo thấp nhất là 1")
    @Max(value = 100, message = "Điểm thành thạo cao nhất là 100 thôi bro")
    private Integer proficiency;
}

