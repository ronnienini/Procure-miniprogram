package com.procure.procureserver.Entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CashList {
    private Long orderID;
    private BigDecimal cash;
}
