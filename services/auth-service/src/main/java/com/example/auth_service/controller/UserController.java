package com.example.auth_service.controller;


import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder ;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody User user ){

        if(userRepository.existsByUsername(user.getUsername())){
            return ResponseEntity.badRequest().body("Name is exist") ;
        }

        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body("Email is exist") ;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("Add user:" +user.getUsername() +" Succesfully");
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody User user){
        userRepository.save(user);
        return  ResponseEntity.ok("Update user: "+user.getId() +" Succesfully");
    }
}
