package com.procure.procureserver.Mapper;

import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.Type;
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
