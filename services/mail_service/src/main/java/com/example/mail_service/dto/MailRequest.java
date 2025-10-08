package com.example.mail_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MailRequest {

    private String to;

    private String subject;

    private String body;

}
