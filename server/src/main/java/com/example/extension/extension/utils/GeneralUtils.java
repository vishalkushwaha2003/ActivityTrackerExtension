package com.example.extension.extension.utils;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
@Component
public class GeneralUtils {


    public  int getDifferenceInMinutes(Date date1, Date date2) {
        // Convert Date to Instant
        Instant instant1 = date1.toInstant();
        Instant instant2 = date2.toInstant();

        // Calculate the duration between the two instants
        Duration duration = Duration.between(instant1, instant2);

        // Get the difference in minutes

        return (int)duration.toMinutes();
    }


    public String localTimeToString(LocalDateTime timeStamp) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        return timeStamp.format(formatter);
    }

    public LocalDateTime stringToLocalTime(String timeStamp) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        return LocalDateTime.parse(timeStamp, formatter);
    }
}
