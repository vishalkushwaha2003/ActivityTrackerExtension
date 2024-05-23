package com.example.extension.extension.controller;

import com.example.extension.extension.model.WindowTabsDTO;
import com.example.extension.extension.service.TabService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/tabs")
public class TabController {

    @Autowired
    TabService tabService;

    @PostMapping
    public ResponseEntity<String> createTab(@RequestBody WindowTabsDTO windowTabsDto){
        String tabId=tabService.createTab(windowTabsDto);
        return new ResponseEntity<>("Tab added successfully  "+tabId, HttpStatus.OK);
    }
}
