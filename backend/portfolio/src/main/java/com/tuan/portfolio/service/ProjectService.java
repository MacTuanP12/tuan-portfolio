package com.tuan.portfolio.service;

import com.tuan.portfolio.dto.request.ProjectRequest;
import com.tuan.portfolio.dto.response.ProjectResponse;
import com.tuan.portfolio.entity.Project;
import java.util.List;

public interface ProjectService {
    //List<Project> getAllProjects();
    //Project addProject(Project project);

    // Trả về danh sách Response DTO
    List<ProjectResponse> getAllProjects();

    // Nhận vào Request DTO, trả về Response DTO
    ProjectResponse addProject(ProjectRequest request);
}