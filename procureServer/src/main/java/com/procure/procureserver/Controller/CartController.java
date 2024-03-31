package com.procure.procureserver.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.Pair;
import com.procure.procureserver.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    @PostMapping("/cart/reserve")
    ResponseEntity<String> tryReserve(@RequestBody String data){
        String ret="";
        try {
            Map<String, Object> map=new HashMap<String,Object>();

            ObjectMapper mapper = new ObjectMapper();
            int[][] pairs = mapper.readValue(data, int[][].class);
            int tryReserve=service.tryPurchase(pairs);
            map.put("tryReserve",tryReserve!=-1);
            if(tryReserve!=-1){

            }else{

            }
            ret=mapper.writeValueAsString(map);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(ret);
    }
    @PostMapping("/cart/checkout")
    ResponseEntity<String> checkout(@RequestBody long id){


        return ResponseEntity.ok("");
    }

}
