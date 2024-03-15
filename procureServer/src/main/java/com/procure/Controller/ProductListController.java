package com.procure.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductListController {
    @GetMapping("/api/test")
    public ResponseEntity test(){
        return ResponseEntity.ok("test");
    }

}
