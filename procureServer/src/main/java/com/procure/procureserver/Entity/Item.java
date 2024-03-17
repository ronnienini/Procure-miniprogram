package com.procure.procureserver.Entity;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Item {
    private Long id;
    private String name;
    private Long quantity;
    private String description;
    private BigDecimal price;
    private int type;
}
