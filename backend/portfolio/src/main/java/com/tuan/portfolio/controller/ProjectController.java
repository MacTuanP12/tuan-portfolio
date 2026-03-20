package com.tuan.portfolio.controller;

import com.tuan.portfolio.dto.request.ProjectRequest;
import com.tuan.portfolio.dto.response.ProjectResponse;
import com.tuan.portfolio.entity.Project;
import com.tuan.portfolio.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<ProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping
    public ProjectResponse createProject(@Valid @RequestBody ProjectRequest request) {
        return projectService.addProject(request);
    }
}