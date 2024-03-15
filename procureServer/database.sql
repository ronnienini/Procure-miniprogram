CREATE DATABASE procure;
USE procure;

# 用户表
CREATE TABLE User(
    phone VARCHAR(20) PRIMARY KEY NOT NULL UNIQUE ,
    name VARCHAR(20) NOT NULL ,
    sex VARCHAR(2) NOT NULL ,
    userType INT NOT NULL
);

# 商品表
CREATE TABLE Item(
    id BIGINT PRIMARY KEY NOT NULL UNIQUE ,
    name VARCHAR(30) NOT NULL ,
    quantity BIGINT NOT NULL ,
    description VARCHAR(30) ,
    price DECIMAL(10,2) NOT NULL ,
    type INT NOT NULL ,
    UNIQUE INDEX (id)
);

# 清单
CREATE TABLE List(
    serialNumber BIGINT PRIMARY KEY NOT NULL UNIQUE ,
    listData JSON NOT NULL ,
    amount DECIMAL(10,2) ,
    phoneSell VARCHAR(20) NOT NULL ,
    phoneBuy VARCHAR(20) NOT NULL ,
    time DATETIME NOT NULL ,
    FOREIGN KEY (phoneSell) REFERENCES User(phone),
    FOREIGN KEY (phoneBuy) REFERENCES User(phone),
    UNIQUE INDEX (serialNumber)
);

CREATE TABLE ProvideProduct(
    serialNumber BIGINT PRIMARY KEY NOT NULL UNIQUE ,
    itemID BIGINT NOT NULL REFERENCES Item(id) ,
    quantity BIGINT NOT NULL ,
    time DATETIME NOT NULL ,
    UNIQUE INDEX (serialNumber)
);

# 总金额
CREATE TABLE total_transaction_amount (
    total_amount DECIMAL(10, 2)
);
INSERT INTO total_transaction_amount value (0);

# 触发器

DELIMITER //

CREATE TRIGGER update_total_amount AFTER INSERT ON List
    FOR EACH ROW
BEGIN
    DECLARE new_amount DECIMAL(10, 2);

    -- 计算新的总金额
    SELECT total_amount + NEW.amount INTO new_amount FROM total_transaction_amount;

    -- 更新总金额表
    UPDATE total_transaction_amount SET total_amount = new_amount;
END;
//

DELIMITER ;
