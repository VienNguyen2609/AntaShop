package org.anta.service;

import org.anta.dto.request.RegisterRequest;
import org.anta.entity.Role;
import org.anta.entity.User;
import org.anta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Name is already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email is already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        if ("admin".equalsIgnoreCase(request.getUsername())) user.setRole(Role.ADMIN);
        else if ("staff".equalsIgnoreCase(request.getUsername())) user.setRole(Role.STAFF);
        else user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Password wrong!");
        }
        return user;
    }

    public String createResetCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        String resetCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase();
        user.setReset_code(resetCode);
        user.setReset_expiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);
        return resetCode;
    }

    public boolean verifyResetCode(String email, String code) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        if (user.getReset_code() == null || user.getReset_expiry() == null) return false;
        if (!user.getReset_code().equals(code)) return false;
        if (user.getReset_expiry().isBefore(LocalDateTime.now())) return false;
        return true;
    }

    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setReset_code(null);
        user.setReset_expiry(null);
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
