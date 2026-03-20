package com.tuan.portfolio.service;

import com.tuan.portfolio.dto.request.MessageRequest;
import com.tuan.portfolio.dto.response.MessageResponse;
import java.util.List;

public interface MessageService {
    MessageResponse sendMessage(MessageRequest request);
    List<MessageResponse> getAllMessages();
}