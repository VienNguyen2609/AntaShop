package org.anta.service;

import org.anta.dto.request.HtmlMailRequest;
import org.anta.dto.request.MailRequest;
import org.anta.dto.request.ResetMailRequest;
import jakarta.mail.MessagingException;


public interface MaiService {

    void sendSimpleEmail(MailRequest mailRequest);

    void sendEmailByFormHTML(HtmlMailRequest htmlMailRequest) throws MessagingException;

    void sendResetCode(ResetMailRequest req);

}
