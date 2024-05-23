package com.example.extension.extension.dao;

import com.example.extension.extension.entity.WindowTabs;
import org.hibernate.sql.exec.spi.JdbcCallParameterExtractor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WindowTabsDAO extends JpaRepository<WindowTabs, String> {
}
