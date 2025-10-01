package com.example.demo.controller;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import com.example.demo.service.EmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final EmailService emailService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

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

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        User user = optionalUser.get();

        // Sinh mã OTP ngẫu nhiên (6 ký tự chữ + số)
        String resetCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        user.setReset_code(resetCode);
        user.setReset_expiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // Gửi email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Code");
        message.setText("Your password reset code is: " + resetCode + "\nThis code will expire in 15 minutes.");
        mailSender.send(message);

        return ResponseEntity.ok("Reset code sent to email");
    }

    // ========== 2. Xác minh mã ==========
    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        User user = optionalUser.get();
        if (user.getReset_code() == null || user.getReset_expiry() == null) {
            return ResponseEntity.badRequest().body("No reset request found");
        }

        if (!user.getReset_code().equals(code)) {
            return ResponseEntity.badRequest().body("Invalid code");
        }

        if (user.getReset_expiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Code expired");
        }

        return ResponseEntity.ok("Code verified successfully");
    }

    // ========== 3. Đặt lại mật khẩu ==========
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        User user = optionalUser.get();

        // Update mật khẩu
        user.setPassword(passwordEncoder.encode(newPassword));
        // Xóa code để tránh reuse
        user.setReset_code(null);
        user.setReset_expiry(null);

        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully");
    }

}
