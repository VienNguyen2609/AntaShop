package com.example.auth_service.controller;

import com.example.auth_service.dto.request.UserRequest;
import com.example.auth_service.dto.response.UserResponse;
import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder ;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUser(){

        List<UserResponse> userResponses = userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id){

        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No user found");
        }

        return ResponseEntity.ok(toResponse(user.get()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody UserRequest userRequest ){

        if(userRepository.existsByUsername(userRequest.getUsername())){
            return ResponseEntity.badRequest().body("Name is exist") ;
        }

        if(userRepository.existsByEmail(userRequest.getEmail())){
            return ResponseEntity.badRequest().body("Email is exist") ;
        }

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setEmail(userRequest.getEmail());
        user.setRole(userRequest.getRole());

        userRepository.save(user);
        return ResponseEntity.ok("Add userRequest:" +user.getUsername() +" Succesfully");

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id , @RequestBody UserRequest userUpdate){

        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isEmpty()){
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No user found");
        }

        User existingUser = optionalUser.get();

        existingUser.setUsername((userUpdate.getUsername()));
        existingUser.setEmail((userUpdate.getEmail()));
        existingUser.setRole((userUpdate.getRole()));

        if(userUpdate.getPassword() != null && !userUpdate.getPassword().isEmpty()){
            existingUser.setPassword(passwordEncoder.encode(userUpdate.getPassword()));
        }

        userRepository.save(existingUser);

        return ResponseEntity.ok("Update successfully is : " +id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {

        if(!userRepository.existsById(id)){
            return ResponseEntity.status(404).body(" User not found");
        }

        userRepository.deleteById(id);

        return ResponseEntity.ok("Delete successfully is : " +id);

    }

    // Hide password
    private UserResponse toResponse(User user) {
        UserResponse res = new UserResponse();
        res.setId(user.getId());
        res.setUsername(user.getUsername());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole());
        return res;
    }
}
