package com.procure.Mapper;

import com.procure.Entity.Type;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductListMapper {
    @Select("SELECT typeName FROM Type")
    List<Type> getTypes();
}
