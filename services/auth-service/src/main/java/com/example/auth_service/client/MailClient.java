package com.example.auth_service.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.util.Map;

@Component
public class MailClient {

    private final RestTemplate restTemplate;

    public MailClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


//    public void sendRegistrationEmail(String to, String username) {
//        String url = "http://localhost:8082/api/mail/send";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        String content = "Xin chào " + username + ",\n\n"
//                + "Cảm ơn bạn đã đăng ký tài khoản tại ShoeShop.\n\n"
//                + "Trân trọng,\nShoeShop Team";
//
//        Map<String, String> body = Map.of(
//                "to", to,
//                "subject", "Đăng ký thành công tại ShoeShop",
//                "content", content
//        );
//
//        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
//
//        try {
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//            System.out.println("Mail service response: " + response.getBody());
//        } catch (HttpServerErrorException e) {
//            System.err.println("Mail server error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
//            throw e;
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw e;
//        }
//
//    }

    public void sendRegistrationEmail(String to, String username) {
        String url = "http://localhost:8082/api/mail/send-html"; // ✅ dùng endpoint HTML

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "to", to,
                "subject", "🎉 Đăng ký thành công tại ShoeShop",
                "username", username
        );

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        System.out.println("Mail service response: " + response.getBody());
    }

    public void sendResetCodeEmail(String to, String resetCode) {
        String url = "http://localhost:8082/api/mail/send-reset"; // trỏ tới mail-service

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "to", to,
                "subject", "Password Reset Code",
                "code", resetCode
        );

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
        restTemplate.postForEntity(url, request, String.class);
    }
}
