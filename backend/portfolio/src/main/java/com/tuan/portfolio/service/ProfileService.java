package com.tuan.portfolio.service;

import com.tuan.portfolio.dto.request.ProfileRequest;
import com.tuan.portfolio.dto.response.ProfileResponse;

public interface ProfileService {
    ProfileResponse getProfile();
    ProfileResponse saveOrUpdateProfile(ProfileRequest request);
}