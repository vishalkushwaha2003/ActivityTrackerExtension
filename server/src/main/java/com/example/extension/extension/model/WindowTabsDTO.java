package com.example.extension.extension.model;

import lombok.Data;

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
    private int id;
    private boolean incognito;
    //    private int index;
    private double lastAccessed;

    private int openerTabId;
    //    private String pendingUrl;
    private boolean pinned;
    private boolean selected;
    //    private String status;
    private String title;
    private String url;
    private int width;
    private int windowId;

}
