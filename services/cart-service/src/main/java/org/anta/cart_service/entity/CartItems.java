package org.anta.cart_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "created_at")
    private LocalDateTime createdAt= LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Carts cart;

    @Transient
    public Double getTotalAmount() {
        if (unitPrice == null) return 0.0;
        return 1.0*unitPrice * quantity;
    }

}
