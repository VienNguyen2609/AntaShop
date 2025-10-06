package com.example.mail_service.controller;

import com.example.mail_service.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    // 📩 Gửi mail thường (text)
    @PostMapping("/send")
    public ResponseEntity<String> sendMail(@RequestBody Map<String, String> request) {
        System.out.println("📩 Mail request: " + request);
        String to = request.get("to");
        String subject = request.get("subject");
        String content = request.get("content");

        if (to == null || subject == null || content == null) {
            return ResponseEntity.badRequest().body("Missing fields: to, subject, content");
        }

        try {
            mailService.sendSimpleEmail(to, subject, content);
            return ResponseEntity.ok("Mail sent successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error sending mail: " + e.getMessage());
        }
    }

    // 🔑 Gửi mail reset mật khẩu
    @PostMapping("/send-reset")
    public ResponseEntity<String> sendResetCode(@RequestBody Map<String, String> body) {
        String to = body.get("to");
        String subject = body.get("subject");
        String code = body.get("code");

        mailService.sendSimpleEmail(to, subject,
                "Your password reset code is: " + code + "\nThis code will expire in 15 minutes.");

        return ResponseEntity.ok("Reset code sent");
    }

    // 🎨 Gửi mail HTML (đẹp khi đăng ký)
    @PostMapping("/send-html")
    public ResponseEntity<String> sendHtmlMail(@RequestBody Map<String, String> body) {
        String to = body.get("to");
        String subject = body.get("subject");
        String username = body.get("username");

        if (to == null || subject == null || username == null) {
            return ResponseEntity.badRequest().body("Missing fields: to, subject, username");
        }

        try {
            mailService.sendHtmlEmail(to, subject, username);
            return ResponseEntity.ok("HTML mail sent successfully");
        } catch (MessagingException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error sending HTML mail: " + e.getMessage());
        }
    }
}
