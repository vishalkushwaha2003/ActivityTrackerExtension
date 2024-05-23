package com.example.extension.extension.model;

import com.example.extension.extension.entity.WindowTabs;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;
@Data
public class UserDTO {

    String userId;
    String userName;
    String email;
    String password;


    List<WindowTabs> activeTabs;

    List<WindowTabs> closedTabs;

}
