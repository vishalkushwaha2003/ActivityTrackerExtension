package com.example.extension.extension.service;

import com.example.extension.extension.dao.UserDAO;
import com.example.extension.extension.entity.BlockedSites;
import com.example.extension.extension.entity.User;
import com.example.extension.extension.model.BlockDTO;
import com.example.extension.extension.model.UserDTO;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class UserService {



    public  record  BlockInfo(String userId, List<BlockDTO> blockedSitesList){};
    @Autowired
    UserDAO userDAO;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    SimpMessageSendingOperations messagingTemplate;


    public UserDTO createUser(UserDTO userDTO){

        return modelMapper.map(userDAO.save(modelMapper.map(userDTO, User.class)),UserDTO.class);
    }

    @Transactional
    public void updateBlockList(BlockDTO blockDTO) {

        //exception


     //   userDAO.findAll().stream().map(object -> modelMapper.map(object, UserDTO.class)).collect(Collectors.toList());
//        userDAO.findById(blockDTO.getUserId()).get().getBlockedSitesList().add(modelMapper.map(blockDTO, BlockedSites.class));
//        List<BlockDTO> blockDTOList=userDAO.findById(blockDTO.getUserId()).get().getBlockedSitesList().stream().map(object->modelMapper.map(object, BlockDTO.class)).toList();


        BlockInfo blockInfo=userDAO.findById(blockDTO.getUserId())
                .map(user -> {
                    BlockedSites blockedSite = modelMapper.map(blockDTO, BlockedSites.class);
                    user.getBlockedSitesList().add(blockedSite);
                    userDAO.save(user); // Save the user with the new blocked site
                    List<BlockDTO> blockDTOList=user.getBlockedSitesList().stream()
                            .map(site -> modelMapper.map(site, BlockDTO.class))
                            .toList();

                    return new BlockInfo(blockDTO.getUserId(),blockDTOList);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));

        messagingTemplate.convertAndSend("/topic/"+blockDTO.getUserId(),blockInfo);
    }


    @Transactional
    public void unblock(String userId, String blockId) {
        BlockInfo blockInfo=userDAO.findById(userId)
                .map(user -> {
                    List<BlockedSites> blockedSitesList = user.getBlockedSitesList();
                    blockedSitesList.removeIf(site -> site.getBlockSitesId().equals(blockId));
                    userDAO.save(user); // Save the user with the updated blocked sites list
                    List<BlockDTO> blockDTOList= blockedSitesList.stream()
                            .map(site -> modelMapper.map(site, BlockDTO.class))
                            .toList();
                    return new BlockInfo(userId, blockDTOList);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
        messagingTemplate.convertAndSend("/topic/"+userId,blockInfo);
    }
}
