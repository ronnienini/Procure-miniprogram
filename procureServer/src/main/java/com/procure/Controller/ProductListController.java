package com.procure.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.procure.Service.ProductListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductListController {
    @Autowired
    private ProductListService service;
    private ObjectMapper mapper = new ObjectMapper();
    private static final String path = "C:\\pic";//Linux下需要更改
    @GetMapping("/cate/types")
    public ResponseEntity<String> getTypes(){
        String json="";
        try {
            json = mapper.writeValueAsString(service.getTypes());
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(json);
    }
    @GetMapping("/cate/products")
    public ResponseEntity<String> getProduct(){
        System.out.println("成功调用");
        return ResponseEntity.ok("test");
    }

}
