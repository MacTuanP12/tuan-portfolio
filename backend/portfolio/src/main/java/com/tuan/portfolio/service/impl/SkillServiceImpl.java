package com.tuan.portfolio.service.impl;

import com.tuan.portfolio.dto.request.SkillRequest;
import com.tuan.portfolio.dto.response.SkillResponse;
import com.tuan.portfolio.entity.Skill;
import com.tuan.portfolio.repository.SkillRepository;
import com.tuan.portfolio.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<SkillResponse> getAllSkills() {
        return skillRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public SkillResponse addSkill(SkillRequest request) {
        Skill skill = new Skill();
        skill.setName(request.getName());
        skill.setCategory(request.getCategory());
        skill.setProficiency(request.getProficiency());
        return mapToResponse(skillRepository.save(skill));
    }

    private SkillResponse mapToResponse(Skill skill) {
        SkillResponse response = new SkillResponse();
        response.setId(skill.getId());
        response.setName(skill.getName());
        response.setCategory(skill.getCategory());
        response.setProficiency(skill.getProficiency());
        return response;
    }
}