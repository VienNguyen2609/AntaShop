package com.example.product_service.dto.response;

import com.example.product_service.util.JsonListConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import lombok.Data;

import java.util.List;

@Data
public class ProductResponse {

    private Long id;

    private String name;

    private String brand;

    private String description;

    private Double price;

    private Integer stock;

    private String size;

    private String color;

    private String category;

    private List<String> images;

    private java.sql.Timestamp createdAt;
}
