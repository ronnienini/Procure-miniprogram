package com.procure.procureserver.Mapper;

import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.math.BigDecimal;

@Mapper
public interface CartMapper {
    @Select("SELECT * from Item WHERE id=#{id}")
    Item getItemByID(long id);
    @Select("SELECT quantity FROM Item WHERE id=#{id}")
    int getQuantityByID(long id);
    @Update("UPDATE Item SET quantity=quantity-#{value} WHERE id=#{key}")
    void purchase(long key,long value);
    @Select("SELECT MAX(serialNumber) FROM List")
    Long getListNumbers();
    @Insert("INSERT INTO List value(#{serialNumber},#{ListData},#{amount},#{phoneSell},#{phoneBuy},#{time,jdbcType=TIMESTAMP})")
    void addList(List newList);
    @Select("SELECT name FROM Item where id=#{id}")
    String getItemNameByID(long id);
    @Update("UPDATE Item SET quantity=quantity+#{quantity} WHERE id=#{key}")
    int resetItemQuantity(long key, long quantity);
    @Update("UPDATE List SET amount=#{cash,jdbcType=DECIMAL} WHERE serialNumber=#{number}")
    int addAmount(Long cash, BigDecimal number);
}
