package com.tuan.portfolio.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MessageRequest {
    @NotBlank(message = "Hãy nhập tên của bạn!")
    private String senderName;

    @NotBlank(message = "Email không được để trống.")
    @Email(message = "Email nhập sai định dạng rồi bro ơi!")
    private String senderEmail;

    @NotBlank(message = "Hãy nhâpp nội dung tin nhắn")
    private String content;
}