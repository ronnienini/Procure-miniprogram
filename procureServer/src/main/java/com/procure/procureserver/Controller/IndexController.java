package com.procure.procureserver.Controller;

import com.procure.procureserver.Entity.User;
import com.procure.procureserver.Service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @Autowired
    private IndexService service;
    @PostMapping("/index/register")
    public ResponseEntity<String> register(@RequestBody User user){
        return ResponseEntity.ok(service.addUser(user)?"0":"1");
    }
    @PostMapping("/index/login")
    public ResponseEntity<String> login(@RequestBody String phone){
        int type=service.checkUser(phone);
    }

}
