package com.procure.Mapper;

import com.procure.Entity.Item;
import com.procure.Entity.Type;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductListMapper {
    @Select("SELECT * FROM Type")
    List<Type> getTypes();
    @Select("SELECT * FROM Item WHERE type=#{id}")
    List<Item> getItemByID(int id);
}
