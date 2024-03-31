package com.procure.procureserver.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.procure.procureserver.Entity.CashList;
import com.procure.procureserver.Entity.Item;
import com.procure.procureserver.Entity.Pair;
import com.procure.procureserver.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import static java.math.BigDecimal.ZERO;

@RestController
public class CartController {
    @Autowired
    private CartService service;
    private final ObjectMapper mapper = new ObjectMapper();
    @GetMapping("/cart/item/{id}")
    ResponseEntity<String> getItem(@PathVariable long id){
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
            long[][] pairs = mapper.readValue(data, long[][].class);
            long serialNumber=service.tryPurchase(pairs);
            map.put("tryReserve",serialNumber!=-1);
            if(serialNumber!=-1){
                map.put("orderID",serialNumber);
            }else{
                map.put("ItemName",service.getNotEnoughItems(pairs));
            }
            ret=mapper.writeValueAsString(map);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(ret);
    }
    @PostMapping("/cart/checkout")
    ResponseEntity<String> checkout(@RequestBody CashList cashList) throws JsonProcessingException {
        if(cashList.getCash().compareTo(ZERO)==0){
            service.resetReservation(cashList.getOrderID());
        }else{
            service.finishReservation(cashList.getOrderID(),cashList.getCash());
        }
        return ResponseEntity.ok("");
    }

}
