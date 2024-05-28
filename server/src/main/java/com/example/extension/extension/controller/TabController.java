package com.example.extension.extension.controller;

import com.example.extension.extension.model.WindowTabsDTO;
import com.example.extension.extension.service.TabService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.util.GenericSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/tabs")
@Slf4j
public class TabController {

    @Autowired
    TabService tabService;

    @Autowired
    Gson gson;

    @PostMapping("/activeTab")
    public ResponseEntity<Object> createTab(@RequestBody WindowTabsDTO windowTabsDto){
//        String tabId=tabService.createTab(windowTabsDto);
        log.info(windowTabsDto.toString());
        tabService.createTab(windowTabsDto);
//        JsonObject jsonObject=new JsonObject();
//        jsonObject.addProperty("message","Tab added successfully");
        log.info("tab added successfully");
        return new ResponseEntity<>("Tab added successfully", HttpStatus.OK);
    }
    @PostMapping("/closedTab")
    public ResponseEntity<Object> closedTab(@RequestBody String model){
        log.info("closing tab "+model);
        JsonObject jsonObject = gson.fromJson(model, JsonObject.class);
        String userId=jsonObject.get("userId").getAsString();
        Integer openerTabId=jsonObject.get("id").getAsInt();
        Integer windowId=jsonObject.get("windowId").getAsInt();
        String windowTabId=tabService.closeTab(userId,openerTabId,windowId);
        JsonObject returnObject=new JsonObject();
        jsonObject.addProperty("message","Tab closed successfully");
        jsonObject.addProperty("tabId",windowTabId);
        return new ResponseEntity<>(returnObject,HttpStatus.OK);

    }


}
