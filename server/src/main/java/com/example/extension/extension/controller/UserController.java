package com.example.extension.extension.controller;

import com.example.extension.extension.model.UserDTO;
import com.example.extension.extension.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> createUser(@RequestBody UserDTO userDTO){
        String userId=userService.createUser(userDTO).getUserId();
        return new ResponseEntity<>("Account Created Successfully  "+userId, HttpStatus.OK);
    }
}
