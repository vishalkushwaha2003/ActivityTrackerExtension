package com.example.extension.extension.service;

import com.example.extension.extension.model.RedisModel;
import com.example.extension.extension.model.WindowTabsDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
@Slf4j
public class RedisService {

    @Autowired
    RedisTemplate redisTemplate;

    @Autowired
    ModelMapper modelMapper;



    public RedisModel get(String userId){

        try{
            Object object=redisTemplate.opsForValue().get(userId);
            ObjectMapper objectMapper=new ObjectMapper();
            return objectMapper.readValue(object.toString(),RedisModel.class);
        }
        catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException("Redis Error");
        }
    }
    public boolean isAvailable(String userId){
        try {
            Object object=redisTemplate.opsForValue().get(userId);
            if(object==null) return false;
            return true;
        }
        catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException("Redis Error");
        }
    }

    public void set(String userId, RedisModel redisModel){
        try{
            ObjectMapper objectMapper=new ObjectMapper();
            redisTemplate.opsForValue().set(userId,objectMapper.writeValueAsString(redisModel));
        }
        catch (Exception e){
            e.printStackTrace();
            throw  new RuntimeException("Redis Error");
        }
    }






}
