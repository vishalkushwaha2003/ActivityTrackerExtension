package com.example.extension.extension.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RedisModel {
    String userId;
    List<WindowTabsDTO> activeTabList;
}
