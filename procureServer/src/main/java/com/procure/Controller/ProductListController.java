package com.procure.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductListController {
    @GetMapping("/cate")
    public ResponseEntity<String> test(){
        System.out.println("成功调用");
        return ResponseEntity.ok("test");
    }

}
