package org.anta.service;

import org.anta.dto.request.HtmlMailRequest;
import org.anta.dto.request.MailRequest;
import org.anta.dto.request.ResetMailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;


    @Override
    @Async
    public void sendSimpleEmail(MailRequest mailRequest) {

        if (mailRequest.getBody() == null) {
            throw new IllegalArgumentException("Email body is null");
        }

        try {
            System.out.println(" Sending email to=" + mailRequest.getTo() + " subject="
                    + mailRequest.getSubject());

            System.out.println(" Content preview: " + (mailRequest.getBody().length() > 200 ?
                    mailRequest.getBody().substring(0, 200) + "..." : mailRequest.getBody()));

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(mailRequest.getTo());
            msg.setSubject( mailRequest.getSubject());
            msg.setText(mailRequest.getBody());
            mailSender.send(msg);
            System.out.println(" Mail sent to " + mailRequest.getTo());
        } catch (Exception e) {
            System.err.println(" Error in sendSimpleEmail: " + e.getMessage());
            throw e;
        }
    }

    @Override
    @Async
    public void sendEmailByFormHTML(HtmlMailRequest htmlMailRequest) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(htmlMailRequest.getTo());
        helper.setSubject( htmlMailRequest.getSubject());

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
                """.formatted(htmlMailRequest.getUsername());

        helper.setText(htmlContent, true); // true = HTML

        mailSender.send(message);
    }

    @Override
    @Async
    public void sendResetCode(ResetMailRequest req) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(req.getTo());
        msg.setSubject("Password reset code");
        msg.setText("Your password reset code: " + req.getCode() + "\nThis code will expire in 15 minutes.");
        mailSender.send(msg);
        System.out.println("MailService: sent reset code to=" + req.getTo());
    }

}
