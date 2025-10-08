package com.example.mail_service.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendSimpleEmail(String to, String subject, String body) {
        if (body == null) {
            throw new IllegalArgumentException("Email body is null");
        }
        try {
            System.out.println("📬 Sending email to=" + to + " subject=" + subject);
            System.out.println("📄 Content preview: " + (body.length() > 200 ? body.substring(0,200) + "..." : body));
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(to);
            msg.setSubject(subject);
            msg.setText(body);
            mailSender.send(msg);
            System.out.println(" Mail sent to " + to);
        } catch (Exception e) {
            System.err.println(" Error in sendSimpleEmail: " + e.getMessage());
            throw e;
        }
    }


    public void sendHtmlEmail(String to, String subject, String username) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);

        // HTML template
        String htmlContent = """
                <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
                    <h2 style="color: #4CAF50;">🎉 Đăng ký thành công!</h2>
                    <p>Xin chào <b>%s</b>,</p>
                    <p>Bạn đã đăng ký tài khoản thành công tại <b>ShoeShop</b>.</p>
                    
                    <p style="margin: 20px 0;">
                        <a href="http://localhost:5173/login"
                           style="background-color:#4CAF50;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
                           👉 Đăng nhập ngay
                        </a>
                    </p>
                    
                    <hr>
                    <p style="font-size: 12px; color: #777;">Nếu bạn không thực hiện hành động này, vui lòng bỏ qua email này.</p>
                </div>
                """.formatted(username);

        helper.setText(htmlContent, true); // true = HTML

        mailSender.send(message);
    }
}
