package com.example.demo.controller;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final EmailService emailService; // 👈 inject EmailService

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) throws MessagingException {
        User savedUser = userService.register(request);

        emailService.sendHtmlEmail(
                savedUser.getEmail(),
                "Đăng ký thành công tại ShoeShop",
                savedUser.getUsername()
        );

        return ResponseEntity.ok("Đăng ký thành công. Vui lòng kiểm tra email.");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedInUser = userService.login(user.getUsername(), user.getPassword());
        return ResponseEntity.ok(loggedInUser);
    }
}
