package org.anta.service;

import jakarta.transaction.Transactional;
import org.anta.dto.request.RegisterRequest;
import org.anta.entity.Role;
import org.anta.entity.User;
import org.anta.repository.AuditLogRepository;
import org.anta.repository.PasswordResetTokenRepository;
import org.anta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.anta.entity.PasswordResetToken;
import org.anta.entity.AuditLog;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final AuditLogRepository auditLogRepository;


    // them 1 hàm gửi mã về email để tạo tài khoản, kiểm tra nếu nhập mã đúng thì mới cho tạo tài khoản
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

        auditLogRepository.save(AuditLog.builder()
                .user(userRepository.save(user))
                .action("REGISTER_SUCCESS")
                .ipAddress("N/A")
                .userAgent("API_CALL")
                .build());

        return userRepository.save(user);
    }

    public User login(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Password wrong!");
        }

        auditLogRepository.save(AuditLog.builder()
                .user(user)
                .action("LOGIN_SUCCESS")
                .ipAddress("N/A")
                .userAgent("API_CALL")
                .build());

        return user;
    }

    @Transactional
    public String createResetCode(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        String resetCode = UUID.randomUUID().toString().substring(0, 6).toUpperCase();

        passwordResetTokenRepository.save(PasswordResetToken.builder()
                .user(user)
                .token(resetCode)
                .expiryAt(LocalDateTime.now().plusMinutes(15))
                .build());


        auditLogRepository.save(AuditLog.builder()
                .user(user)
                .action("RESET_TOKEN_CREATED")
                .ipAddress("N/A")
                .userAgent("API_CALL")
                .build());
        return resetCode;
    }

    public boolean verifyResetCode(String email, String code) {

        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        Optional<PasswordResetToken> tokenOpt = passwordResetTokenRepository.findByToken(code);

        if (tokenOpt.isEmpty()) {
            return false;
        }

        PasswordResetToken token = tokenOpt.get();

        if (!token.getUser().getId().equals(user.getId())) {
            return false;
        }

        if (token.getExpiryAt().isBefore(LocalDateTime.now())) {
            return false;
        }

        auditLogRepository.save(AuditLog.builder()
                .user(user)
                .action("RESET_TOKEN_VERIFIED")
                .ipAddress("N/A")
                .userAgent("API_CALL")
                .build());

        return true;
    }

    @Transactional
    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        user.setPassword(passwordEncoder.encode(newPassword));

        // Xóa token reset sau khi đổi mật khẩu thành công
        passwordResetTokenRepository.markTokensAsUsedByUserId(user.getId());

        auditLogRepository.save(AuditLog.builder()
                .user(user)
                .action("PASSWORD_RESET_SUCCESS")
                .ipAddress("N/A")
                .userAgent("API_CALL")
                .build());
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
