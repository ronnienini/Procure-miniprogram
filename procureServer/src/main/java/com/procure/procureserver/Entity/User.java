package com.procure.procureserver.Entity;

import lombok.Data;

@Data
public class User {
    private String phone;
    private String name;
    private String sex;
    private int userType;
}
