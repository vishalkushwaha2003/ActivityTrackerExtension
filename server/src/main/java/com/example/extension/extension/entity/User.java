package com.example.extension.extension.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userId;
    String userName;
    String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "activeTabs",referencedColumnName = "userId")
    List<WindowTabs> activeTabs;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "closedTabs",referencedColumnName = "userId")
    List<WindowTabs> closedTabs;
    @OneToMany
    @JoinColumn(name = "blockList",referencedColumnName = "userId")
    List<BlockedSites> blockedSitesList;

}
