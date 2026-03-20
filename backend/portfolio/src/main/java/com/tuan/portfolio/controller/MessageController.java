package com.tuan.portfolio.controller;

import com.tuan.portfolio.dto.request.MessageRequest;
import com.tuan.portfolio.dto.response.MessageResponse;
import com.tuan.portfolio.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService messageService;


    @PostMapping
    public MessageResponse sendMessage(@Valid @RequestBody MessageRequest request) {
        return messageService.sendMessage(request);
    }


    @GetMapping
    public List<MessageResponse> getAllMessages() {
        return messageService.getAllMessages();
    }
}