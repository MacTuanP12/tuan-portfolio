package com.tuan.portfolio.dto.response;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private Long id;
    private String senderName;
    private String senderEmail;
    private String content;
    private Boolean isRead;
    private LocalDateTime createdAt;
}