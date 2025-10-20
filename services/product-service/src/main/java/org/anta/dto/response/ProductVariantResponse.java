package org.anta.dto.response;

import jakarta.persistence.*;
import lombok.Data;
import org.anta.entity.Product;

import java.time.LocalDateTime;

@Data
public class ProductVariantResponse {

    private Long id;

    private Product product;

    private String sku;

    private String name;

    private Double price;

    private Integer stock;

    private String size;

    private String color;

    private String attributes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
