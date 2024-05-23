package com.example.extension.extension.controller;

import com.example.extension.extension.model.BlockDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
@Slf4j
public class SocketController {

    @Autowired
    SimpMessageSendingOperations messagingTemplate;


//    @MessageMapping("/chat.sendMessage")
////    @SendTo("/topic/public")
//    public void sendMessage(
//            @Payload ChatMessageDTO chatMessage, SimpMessageHeaderAccessor headerAccessor
//    ) {
//        log.info(chatMessage.toString());
//        String groupTopic;
//        if (chatMessage.getGroupTopic() == null) {
//            groupTopic = "public";
//        } else {
//            groupTopic = chatMessage.getGroupTopic();
//        }
//        log.info(headerAccessor.getSessionAttributes().get("username").toString());
//
//        String username = (String) headerAccessor.getSessionAttributes().get("username");
//        if (username != null) {
//            ChatMessageDTO chat = ChatMessageDTO.builder()
//                    .type(chatMessage.getType())
//                    .sender(username)
//                    .content(chatMessage.getContent())
//                    .groupTopic(groupTopic)
//                    .referenceId(chatMessage.getReferenceId())
//                    .build();
////            messagingTemplate.convertAndSend("/topic/" + groupTopic, chat);
//            kafkaService.updateChat(chat);
//        }
//
//
//        chatService.addChat(chatMessage);
//    }



    @MessageMapping("/test")
    @SendTo("/topic/public")
    public void Testing(@Payload BlockDTO blockDTO){
        log.info(blockDTO.getMessage());
        messagingTemplate.convertAndSend("/topic/public", "Kya beta !!");
    }
}
