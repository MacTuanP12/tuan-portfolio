package com.tuan.portfolio.service.impl;

import com.tuan.portfolio.dto.request.ProjectRequest;
import com.tuan.portfolio.dto.response.ProjectResponse;
import com.tuan.portfolio.entity.Project;
import com.tuan.portfolio.repository.ProjectRepository;
import com.tuan.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public List<ProjectResponse> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        // Chuyển đổi List<Entity> thành List<DTO>
        return projects.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public ProjectResponse addProject(ProjectRequest request) {
        // 1. Chuyển Request DTO thành Entity để lưu vào DB
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setTechStack(request.getTechStack());
        project.setGithubUrl(request.getGithubUrl());
        project.setLiveUrl(request.getLiveUrl());
        project.setImageUrl(request.getImageUrl());

        // 2. Lưu vào DB
        Project savedProject = projectRepository.save(project);

        // 3. Chuyển Entity vừa lưu thành Response DTO để trả về
        return mapToResponse(savedProject);
    }

    // Hàm phụ trợ để map từ Entity sang Response DTO
    private ProjectResponse mapToResponse(Project project) {
        ProjectResponse response = new ProjectResponse();
        response.setId(project.getId());
        response.setName(project.getName());
        response.setDescription(project.getDescription());
        response.setTechStack(project.getTechStack());
        response.setGithubUrl(project.getGithubUrl());
        response.setLiveUrl(project.getLiveUrl());
        response.setImageUrl(project.getImageUrl());
        response.setCreatedAt(project.getCreatedAt());
        return response;
    }
}