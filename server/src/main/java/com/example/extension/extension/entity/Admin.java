package com.example.extension.extension.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.StandardException;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String adminId;
    String orgName;
    @OneToMany
    @JoinColumn(name = "organisation",referencedColumnName = "adminId")
    List<User> orgUser;


}
