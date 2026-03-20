package com.tuan.portfolio.controller;

import com.tuan.portfolio.dto.request.ProfileRequest;
import com.tuan.portfolio.dto.response.ProfileResponse;
import com.tuan.portfolio.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;


    @GetMapping
    public ProfileResponse getProfile() {
        return profileService.getProfile();
    }


    @PutMapping
    public ProfileResponse updateProfile(@Valid @RequestBody ProfileRequest request) {
        return profileService.saveOrUpdateProfile(request);
    }
}