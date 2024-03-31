package com.procure.procureserver.Mapper;

import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.Pair;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface CartMapper {
    @Select("SELECT * from Item WHERE id=#{id}")
    Item getItemByID(int id);
    @Select("SELECT quantity FROM Item WHERE id=#{id}")
    int getQuantityByID(int id);
    @Update("UPDATE Item SET quantity=quantity-#{value} WHERE id=#{key}")
    void purchase(int key,int value);
}
