package org.anta.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddressResponse {

    private Long id;

    private String addressLine;

    private String city;

    private String district;

    private String ward;

    private String postalCode;

    private Boolean isDefault;

    private LocalDateTime createdAt;

}
