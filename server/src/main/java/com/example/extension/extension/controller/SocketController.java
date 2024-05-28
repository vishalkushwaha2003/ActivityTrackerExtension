package com.example.extension.extension.controller;

import com.example.extension.extension.model.BlockDTO;
import com.example.extension.extension.service.UserService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
    UserService userService;

    @Autowired
    SimpMessageSendingOperations messagingTemplate;

    @Autowired
    Gson gson;


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
//


    @MessageMapping("/test")
    @SendTo("/topic/513a3660-257d-45f9-94eb-5e51d5cdfbaf")
    public void Testing(@Payload String message){

        JsonObject jsonObject = gson.fromJson(message, JsonObject.class);
        log.info(jsonObject.get("message").getAsString());
        messagingTemplate.convertAndSend("/topic/513a3660-257d-45f9-94eb-5e51d5cdfbaf","Hello Raman");
    }


    @MessageMapping("/block")
//    @SendTo("/topic/public")
    public void Blocking(@Payload BlockDTO blockDTO, SimpMessageHeaderAccessor headerAccessor){
//        log.info(blockDTO.getMessage());
//        messagingTemplate.convertAndSend("/topic/public", "Kya beta !!");

        log.info("user Id" +blockDTO.getUserId());
        log.info(blockDTO.toString());
        userService.updateBlockList(blockDTO);
    }


    @MessageMapping("/unblock")
    public void Unblocking(@Payload String unblockInfo){
        JsonObject jsonObject = gson.fromJson(unblockInfo, JsonObject.class);
        String userId=jsonObject.get("userId").getAsString();
        String blockId=jsonObject.get("blockId").getAsString();

        log.info(userId+"   unblocking  "+blockId);
        userService.unblock(userId,blockId);
    }
}
