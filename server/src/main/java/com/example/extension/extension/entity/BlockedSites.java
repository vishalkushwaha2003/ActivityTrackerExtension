package com.example.extension.extension.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class BlockedSites {

    @Id
            @GeneratedValue(strategy = GenerationType.UUID)
    String blockSitesId;
    String url;
    Date startTime;
    Date endTime;
    List<Boolean> days;

}



//  {
//url: "example.com", // The URL of the blocked site
//startTime: "08:00", // The start time of blocking in HH:MM format
//endTime: "18:00",   // The end time of blocking in HH:MM format
//days: [true, true, false, false, false, false, false] // An array representing days of the week (Sunday to Saturday)
//        // In the above array, true indicates that the site is blocked for that day, false indicates it's not blocked.
//        }