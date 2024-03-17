package com.procure.procureserver.Entity;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class ProvideProduct {
    private Long serialNumber;
    private Long itemID;
    private Long quantity;
    private Timestamp time;
}
