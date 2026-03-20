package com.tuan.portfolio.service.impl;

import com.tuan.portfolio.dto.request.MessageRequest;
import com.tuan.portfolio.dto.response.MessageResponse;
import com.tuan.portfolio.entity.Message;
import com.tuan.portfolio.repository.MessageRepository;
import com.tuan.portfolio.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;


    @Autowired
    private JavaMailSender mailSender;

    @Override
    public MessageResponse sendMessage(MessageRequest request) {

        Message message = new Message();
        message.setSenderName(request.getSenderName());
        message.setSenderEmail(request.getSenderEmail());
        message.setContent(request.getContent());
        Message savedMessage = messageRepository.save(message);


        sendEmailNotification(request);

        return mapToResponse(savedMessage);
    }


    private void sendEmailNotification(MessageRequest request) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("tuanmac2k2@gmail.com");
            mailMessage.setTo("tuanmac2k2@gmail.com");
            mailMessage.setSubject("🔥 [Portfolio] Có tin nhắn mới từ: " + request.getSenderName());


            String mailContent = "Bro vừa nhận được một liên hệ mới từ Portfolio!\n\n"
                    + "Người gửi: " + request.getSenderName() + "\n"
                    + "Email liên hệ: " + request.getSenderEmail() + "\n"
                    + "Nội dung:\n" + request.getContent();

            mailMessage.setText(mailContent);


            mailSender.send(mailMessage);
            System.out.println("Đã gửi email thông báo thành công!");

        } catch (Exception e) {


            System.err.println("Lỗi khi gửi email: " + e.getMessage());
        }
    }

    @Override
    public List<MessageResponse> getAllMessages() {
        return messageRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private MessageResponse mapToResponse(Message message) {
        MessageResponse response = new MessageResponse();
        response.setId(message.getId());
        response.setSenderName(message.getSenderName());
        response.setSenderEmail(message.getSenderEmail());
        response.setContent(message.getContent());
        response.setIsRead(message.getIsRead());
        response.setCreatedAt(message.getCreatedAt());
        return response;
    }
}