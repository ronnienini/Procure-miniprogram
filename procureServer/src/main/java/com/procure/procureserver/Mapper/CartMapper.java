package com.procure.procureserver.Mapper;

import com.procure.procureserver.Entity.Item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface CartMapper {
    @Select("SELECT * from Item WHERE id=#{id}")
    Item getItemByID(int id);
}
