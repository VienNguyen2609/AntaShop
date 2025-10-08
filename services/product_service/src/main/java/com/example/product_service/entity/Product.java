package com.example.product_service.entity;

import com.example.product_service.util.JsonListConverter;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String brand;

    private String description;

    private Double price;

    private Integer stock;

    private String size;

    private String color;

    private String category;


    @Convert(converter = JsonListConverter.class)
    @Column(columnDefinition = "json")
    private List<String> images;

    @Column(name = "created_at", updatable = false, insertable = false,
            columnDefinition = "timestamp default current_timestamp")
    private java.sql.Timestamp createdAt;

}
