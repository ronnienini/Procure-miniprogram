package com.procure.procureserver.Entity;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
public class List {
    private Long serialNumber;
    private String listData;
    private BigDecimal amount;
    private String phoneSell;
    private String phoneBuy;
    private Timestamp time;
}
