package com.example.extension.extension.model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.ToString;
import org.springframework.boot.convert.DataSizeUnit;

import java.util.Date;
import java.util.List;

@Data
@ToString
public class BlockDTO {
    String userId;
    String blockSitesId;
    String url;
    Date startTime;
    Date endTime;
    List<Boolean> days;
}
