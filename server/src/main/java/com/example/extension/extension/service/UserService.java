package com.example.extension.extension.service;

import com.example.extension.extension.dao.UserDAO;
import com.example.extension.extension.entity.User;
import com.example.extension.extension.model.UserDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

@Service
public class UserService {


    @Autowired
    UserDAO userDAO;
    @Autowired
    ModelMapper modelMapper;

    public UserDTO createUser(UserDTO userDTO){

        return modelMapper.map(userDAO.save(modelMapper.map(userDTO, User.class)),UserDTO.class);
    }
}
