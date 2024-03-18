package com.procure.procureserver.Mapper;

import com.procure.procureserver.Entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface IndexMapper {
    @Insert("INSERT INTO User value (#{phone},#{name},#{sex},#{userType})")
    int insertUser(User user);

    @Select("SELECT * FROM User WHERE phone=#{phone}")
    User findUser(String phone);
}
