package org.anta.cart_service.dto.request;

import lombok.Data;

@Data
public class CartItemsRequest {
    private Long userId;
    private String sessionId;     // guest session
    private Long productId;
    private Long variantId;
    private String productName;
    private Double unitPrice;
    private Long quantity;
}
