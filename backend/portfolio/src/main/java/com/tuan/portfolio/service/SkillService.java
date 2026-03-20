package com.tuan.portfolio.service;

import com.tuan.portfolio.dto.request.SkillRequest;
import com.tuan.portfolio.dto.response.SkillResponse;
import java.util.List;

public interface SkillService {
    List<SkillResponse> getAllSkills();
    SkillResponse addSkill(SkillRequest request);
}