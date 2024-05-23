package com.example.extension.extension.dao;

import com.example.extension.extension.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, String> {
}
