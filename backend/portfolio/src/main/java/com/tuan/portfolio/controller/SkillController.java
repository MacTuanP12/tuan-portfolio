package com.tuan.portfolio.controller;

import com.tuan.portfolio.dto.request.SkillRequest;
import com.tuan.portfolio.dto.response.SkillResponse;
import com.tuan.portfolio.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public List<SkillResponse> getAllSkills() {
        return skillService.getAllSkills();
    }

    @PostMapping
    public SkillResponse createSkill(@Valid @RequestBody SkillRequest request) {
        return skillService.addSkill(request);
    }
}