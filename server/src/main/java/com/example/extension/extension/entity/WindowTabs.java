package com.example.extension.extension.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class WindowTabs {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String windowTabsId;


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



 //   private Date startTimeStamp;
    private int tabDuration;
//    private Date endTimeStamp;

}
