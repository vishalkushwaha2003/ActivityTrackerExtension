package com.example.extension.extension.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class WindowTabsDTO {


    private  String userId;
    private boolean active;
    //    private boolean audible;
//    private boolean autoDiscardable;
//    private boolean discarded;
    private int groupId;
    //    private int height;
//    private boolean highlighted;
    private Integer id;
    private boolean incognito;
    //    private int index;
    private double lastAccessed;

//    private Integer openerTabId;
    //    private String pendingUrl;
    private boolean pinned;
    private boolean selected;
    //    private String status;
    private String title;
    private String url;
    private int width;
    private Integer windowId;

//
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
//    @JsonIgnore
    private String startTimeStamp;

}
