package org.anta.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetMailRequest {

    @NotBlank
    @Email
    private String to;

    @NotBlank
    private String code;
}
