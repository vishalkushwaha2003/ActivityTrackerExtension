package com.example.extension.extension.controller;

import com.example.extension.extension.model.UserDTO;
import com.example.extension.extension.service.UserService;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;
    @GetMapping("/")
    public ResponseEntity<String> welcome(){
        return new ResponseEntity<>("server is working fine", HttpStatus.OK);
    }


    @PostMapping("/createUser")
    public ResponseEntity<Object> createUser(@RequestBody UserDTO userDTO){
        String userId=userService.createUser(userDTO).getUserId();
//        JsonObject jsonObject=new JsonObject();
//        jsonObject.addProperty("message","Account Created Successfully");
//        jsonObject.addProperty("userId",userId);
        HashMap<Object,Object> jsonObject=new HashMap<>();
        jsonObject.put("message","Account Created Successfully");
        jsonObject.put("userId",userId);

        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }
}
