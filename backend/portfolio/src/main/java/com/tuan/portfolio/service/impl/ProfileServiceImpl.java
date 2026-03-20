package com.tuan.portfolio.service.impl;

import com.tuan.portfolio.dto.request.ProfileRequest;
import com.tuan.portfolio.dto.response.ProfileResponse;
import com.tuan.portfolio.entity.Profile;
import com.tuan.portfolio.repository.ProfileRepository;
import com.tuan.portfolio.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public ProfileResponse getProfile() {
        // Lấy bản ghi đầu tiên (id = 1). Nếu chưa có thì trả về một object rỗng
        Profile profile = profileRepository.findById(1L).orElse(new Profile());
        return mapToResponse(profile);
    }

    @Override
    public ProfileResponse saveOrUpdateProfile(ProfileRequest request) {
        // Tìm xem id=1 đã có chưa, có rồi thì cập nhật, chưa có thì tạo mới
        Profile profile = profileRepository.findById(1L).orElse(new Profile());

        profile.setFullName(request.getFullName());
        profile.setTitle(request.getTitle());
        profile.setAboutMe(request.getAboutMe());
        profile.setGithubUrl(request.getGithubUrl());
        profile.setLinkedinUrl(request.getLinkedinUrl());

        Profile savedProfile = profileRepository.save(profile);
        return mapToResponse(savedProfile);
    }

    private ProfileResponse mapToResponse(Profile profile) {
        ProfileResponse response = new ProfileResponse();
        response.setId(profile.getId());
        response.setFullName(profile.getFullName());
        response.setTitle(profile.getTitle());
        response.setAboutMe(profile.getAboutMe());
        response.setGithubUrl(profile.getGithubUrl());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        return response;
    }
}