package org.anta.dto.request;

import lombok.Data;

@Data
public class AddressRequest {

    private String addressLine;

    private String city;

    private String district;

    private String ward;

    private String postalCode;

    private Boolean isDefault;

}
