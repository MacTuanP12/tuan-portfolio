package com.tuan.portfolio.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank(message = "Nhập tài khoản đi bro")
    private String username;

    @NotBlank(message = "Quên mật khẩu à?")
    private String password;
}