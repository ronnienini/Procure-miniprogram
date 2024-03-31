package com.procure.procureserver.Entity;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Objects;

@Data
public class List {
    private Long serialNumber;
    private String listData;
    private BigDecimal amount;
    private String phoneSell;
    private String phoneBuy;
    private Timestamp time;

    public List(Long serialNumber, String listData, BigDecimal amount, String phoneSell, String phoneBuy, Timestamp timestamp) {
        this.serialNumber=serialNumber;
        this.listData=listData;
        this.amount=amount;
        this.phoneSell=phoneSell;
        this.phoneBuy=phoneBuy;
        this.time=timestamp;
    }
    @Override
    public int hashCode(){
        return Objects.hash(serialNumber);
    }
    @Override
    public boolean equals(Object obj){
        return serialNumber==((List)obj).serialNumber;
    }
}
