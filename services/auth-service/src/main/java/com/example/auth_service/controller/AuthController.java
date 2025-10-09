package com.example.auth_service.controller;


import com.example.auth_service.client.MailClient;
import com.example.auth_service.config.JwtUtil;
import com.example.auth_service.dto.request.LoginRequest;
import com.example.auth_service.dto.request.RegisterRequest;
import com.example.auth_service.entity.User;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.service.UserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final MailClient mailClient;


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) throws MessagingException {
        User savedUser = userService.register(request);
        mailClient.sendRegistrationEmail(savedUser.getEmail(), savedUser.getUsername());

        return ResponseEntity.ok("Đăng ký thành công. Vui lòng kiểm tra email.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getUsername(), request.getPassword());
        String accessToken = jwtUtil.generateAccessToken(user.getUsername() , user.getRole().toString());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());

        return ResponseEntity.ok(Map.of(
                "username" , user.getUsername(),
                "role", user.getRole().toString(),
                "accessToken", accessToken,
                "refreshToken", refreshToken
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        User user = optionalUser.get();

        String resetCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        user.setReset_code(resetCode);
        user.setReset_expiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Code");
        message.setText("Your password reset code is: " + resetCode + "\nThis code will expire in 15 minutes.");
        mailClient.sendResetCodeEmail(email, resetCode);


        return ResponseEntity.ok("Reset code sent to email");
    }

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

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found");
        }

        User user = optionalUser.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setReset_code(null);
        user.setReset_expiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password reset successfully");
    }


    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(Map.of("valid", false, "error", "Missing token"));
        }
        String token = authHeader.substring(7);

        try {
            String username = jwtUtil.extractUsername(token);
            List<String> roles = jwtUtil.extractRoles(token);
            boolean expired = false;
            try {
                expired = jwtUtil.isTokenExpired(token);
            } catch (Exception ex) {
                expired = true;
            }

            if (expired) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("valid", false, "error", "Token expired"));
            }

            return ResponseEntity.ok(Map.of(
                    "username", username,
                    "role", roles,
                    "valid", true
            ));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("valid", false, "error", "Invalid token"));
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        try {
            if (!jwtUtil.isRefreshToken(refreshToken)) {
                return ResponseEntity.status(400).body("Not a refresh token");
            }
            String username = jwtUtil.extractUsername(refreshToken);
            User user = userRepository.findByUsername(username).orElseThrow();
            String newAccessToken = jwtUtil.generateAccessToken(user.getUsername(), user.getRole().toString());

            return ResponseEntity.ok(Map.of("accessToken", newAccessToken));

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired refresh token");
        }
    }
}
