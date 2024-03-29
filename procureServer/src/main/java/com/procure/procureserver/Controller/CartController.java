package com.procure.procureserver.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.procure.procureserver.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {
    @Autowired
    private CartService service;
    private final ObjectMapper mapper = new ObjectMapper();

    @GetMapping("/cart/item/{id}")
    ResponseEntity<String> getItem(@PathVariable int id){
        String json="";
        try{
            json = mapper.writeValueAsString(service.getItem(id));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(json);
    }
}
