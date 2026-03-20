package com.tuan.portfolio.dto.response;

import lombok.Data;

@Data
public class SkillResponse {
    private Long id;
    private String name;
    private String category;
    private Integer proficiency;
}