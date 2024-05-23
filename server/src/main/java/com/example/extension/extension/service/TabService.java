package com.example.extension.extension.service;

import com.example.extension.extension.dao.UserDAO;
import com.example.extension.extension.dao.WindowTabsDAO;
import com.example.extension.extension.entity.WindowTabs;
import com.example.extension.extension.model.WindowTabsDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TabService {

    @Autowired
    WindowTabsDAO windowTabsDAO;

    @Autowired
    UserDAO userDAO;
    @Autowired
    ModelMapper modelMapper;


    public String createTab(WindowTabsDTO windowTabsDTO){

        //add exception user not found



        WindowTabs windowTabs=modelMapper.map(windowTabsDTO,WindowTabs.class);
        windowTabs.setStartTimeStamp(new Date());
        userDAO.findById(windowTabsDTO.getUserId()).get().getActiveTabs().add(windowTabs);
        return windowTabs.getWindowTabsId();

    }
}
