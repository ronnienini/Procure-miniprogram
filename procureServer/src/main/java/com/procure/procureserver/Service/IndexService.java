package com.procure.procureserver.Service;

import com.procure.procureserver.Entity.User;
import com.procure.procureserver.Mapper.IndexMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IndexService {
    private final IndexMapper mapper;
    @Autowired
    public IndexService(IndexMapper mapper){
        this.mapper=mapper;
    }
    public boolean addUser(User user){
        user.setUserType(0);
        return mapper.insertUser(user)==0;
    }

    public int checkUser(String phone) {
        User user =mapper.findUser(phone);
        if(user==null){
            return -1;
        }else{
            return user.getUserType();
        }
    }
}
