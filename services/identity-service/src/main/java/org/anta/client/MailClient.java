package org.anta.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
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


    public void sendRegistrationEmail(String to, String username) {
        var url = "http://localhost:8082/api/mail/send-html";

        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "to", to,
                "subject", "🎉 Đăng ký thành công tại ShoeShop",
                "username", username
        );

        restTemplate.postForEntity(url, new HttpEntity<>(body, headers), String.class);
    }

    public void sendResetCodeEmail(String to, String resetCode) {

        var url = "http://localhost:8082/api/mail/send-reset"; // trỏ tới mail-service

        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = Map.of(
                "to", to,
                "subject", "Password Reset Code",
                "code", resetCode
        );
        restTemplate.postForEntity(url, new HttpEntity<>(body, headers), String.class);
    }
}
