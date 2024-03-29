package com.procure.procureserver.Service;

import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Mapper.CartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartMapper mapper;
    @Autowired
    public CartService(CartMapper mapper){
        this.mapper=mapper;
    }


    public Item getItem(int id) {
        return mapper.getItemByID(id);
    }
}
