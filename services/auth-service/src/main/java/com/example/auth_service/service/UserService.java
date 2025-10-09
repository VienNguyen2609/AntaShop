package com.example.auth_service.service;

import com.example.auth_service.dto.request.RegisterRequest;
import com.example.auth_service.entity.Role;
import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();



    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Name is already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already exists");
        }

//        if(request.getUsername().toLowerCase().contains("admin")){
//            throw new RuntimeException("Invalid name");
//        }
//
//        if(request.getPassword().toLowerCase().contains("admin")){
//            throw new RuntimeException("Invalid password");
//        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        if(request.getUsername().equals("admin")){
            user.setRole(Role.ADMIN);
        }
        else if(request.getUsername().equals("staff")){
            user.setRole(Role.STAFF);
        }
        else{
            user.setRole(Role.USER);
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }


    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Not found is the user"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Password wrong!");
        }
        return user;
    }
}
