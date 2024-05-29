package com.example.extension.extension.service;

import com.example.extension.extension.dao.UserDAO;
import com.example.extension.extension.dao.WindowTabsDAO;
import com.example.extension.extension.entity.BlockedSites;
import com.example.extension.extension.entity.WindowTabs;
import com.example.extension.extension.model.BlockDTO;
import com.example.extension.extension.model.RedisModel;
import com.example.extension.extension.model.UserDTO;
import com.example.extension.extension.model.WindowTabsDTO;
import com.example.extension.extension.utils.GeneralUtils;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class TabService {

    @Autowired
    WindowTabsDAO windowTabsDAO;

    @Autowired
    UserDAO userDAO;
    @Autowired
    ModelMapper modelMapper;

    @Autowired
    RedisService redisService;

    @Autowired
    GeneralUtils generalUtils;


    public void createTab(WindowTabsDTO windowTabsDTO){

        //add exception user not found



//        WindowTabs windowTabs=modelMapper.map(windowTabsDTO,WindowTabs.class);
//        windowTabs.setStartTimeStamp(new Date());

//        UserService.BlockInfo blockInfo=userDAO.findById(blockDTO.getUserId())
//                .map(user -> {
//                    BlockedSites blockedSite = modelMapper.map(blockDTO, BlockedSites.class);
//                    user.getBlockedSitesList().add(blockedSite);
//                    userDAO.save(user); // Save the user with the new blocked site
//                    List<BlockDTO> blockDTOList=user.getBlockedSitesList().stream()
//                            .map(site -> modelMapper.map(site, BlockDTO.class))
//                            .toList();
//
//                    return new UserService.BlockInfo(blockDTO.getUserId(),blockDTOList);
//                })
//                .orElseThrow(() -> new RuntimeException("User not found"));

//
//        return userDAO.findById(windowTabsDTO.getUserId()).map(user ->{
//            user.getActiveTabs().add(windowTabs);
//            userDAO.save(user);
//            return user.getUserId();
//        } ).orElseThrow(()->new RuntimeException("User Not exist"));
//        return windowTabs.getWindowTabsId();

        log.info(new Date().toString());
        windowTabsDTO.setStartTimeStamp(generalUtils.localTimeToString(LocalDateTime.now()));
        log.info(windowTabsDTO.toString());


        if(redisService.isAvailable(windowTabsDTO.getUserId())){
            RedisModel redisModel=redisService.get(windowTabsDTO.getUserId());
            redisModel.getActiveTabList().add(windowTabsDTO);

            redisService.set(windowTabsDTO.getUserId(),redisModel);
        }
        else {
            List<WindowTabsDTO> activeTabList=new ArrayList<>();
            activeTabList.add(windowTabsDTO);
            RedisModel redisModel=new RedisModel(windowTabsDTO.getUserId(),activeTabList );
            redisService.set(windowTabsDTO.getUserId(),redisModel);
        }



    }

    public String closeTab(String userId, Integer id, Integer windowId) {
        WindowTabsDTO currentTab=null;
        WindowTabs windowTabs=null;

        List<WindowTabsDTO> activeTabList=redisService.get(userId).getActiveTabList();
        for(WindowTabsDTO activeTab:activeTabList){
            if(id.intValue()==activeTab.getId().intValue() && windowId.intValue()==activeTab.getWindowId().intValue() ){
                currentTab=activeTab;
                windowTabs=modelMapper.map(currentTab,WindowTabs.class);
                windowTabs.setTabDuration((int) Duration.between(generalUtils.stringToLocalTime(activeTab.getStartTimeStamp()),LocalDateTime.now()).toMinutes());
                log.info("tab for saving"+windowTabs.toString());
                windowTabsDAO.save(windowTabs);

                break;
            }
        }
        activeTabList.remove(currentTab);
        redisService.set(userId,new RedisModel(userId,activeTabList));

        return "Tab close successfully";
    }
}
