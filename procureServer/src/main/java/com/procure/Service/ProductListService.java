package com.procure.Service;

import com.procure.Entity.Type;
import com.procure.Mapper.ProductListMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductListService {

    private final ProductListMapper mapper;
    @Autowired
    public ProductListService(ProductListMapper mapper) {
        this.mapper = mapper;
    }
    public List<Type> getTypes(){
        return mapper.getTypes();
    }
}
