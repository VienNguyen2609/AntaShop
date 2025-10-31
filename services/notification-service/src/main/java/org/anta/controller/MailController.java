package org.anta.controller;

import org.anta.dto.request.HtmlMailRequest;
import org.anta.dto.request.MailRequest;
import org.anta.dto.request.ResetMailRequest;
import org.anta.dto.response.MailResponse;
import org.anta.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @PostMapping("/send")
    public ResponseEntity<MailResponse> sendSimpleMail(@RequestBody @Valid MailRequest req) {
        try {
            mailService.sendSimpleEmail(req);
            return ResponseEntity.ok(new MailResponse(true ,
                    "Mail sent successfully" , null));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new MailResponse(false ,
                    "Mail sent unsuccessfully" , e.getMessage()));
        }
    }


    @PostMapping("/send-html")
    public ResponseEntity<MailResponse> sendMailByFormHTML(@RequestBody @Valid HtmlMailRequest htmlMailRequest) {
        try {
            mailService.sendEmailByFormHTML(htmlMailRequest);
            return ResponseEntity.ok(new MailResponse(true ,
                    "HTML mail sent successfully" , null));
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body(new MailResponse(false ,
                    "HTML mail sent successfully" , e.getMessage()));
        }
    }

    @PostMapping("/send-reset")
    public ResponseEntity<MailResponse> sendResetCode(@RequestBody @Valid ResetMailRequest resetMailRequest) {
        try {
            mailService.sendResetCode(resetMailRequest);
            return ResponseEntity.ok(new MailResponse(true ,
                    "Reset code sent successfully" , null));
        } catch (Exception e) {
            return ResponseEntity.ok(new MailResponse(false ,
                    "Reset code sent unsuccessfully" , e.getMessage()) );
        }
    }


}
