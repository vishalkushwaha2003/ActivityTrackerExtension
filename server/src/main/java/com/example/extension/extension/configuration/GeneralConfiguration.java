package com.example.extension.extension.configuration;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeneralConfiguration {

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }



}
