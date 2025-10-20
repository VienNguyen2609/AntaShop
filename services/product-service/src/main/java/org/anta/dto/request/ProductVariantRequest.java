package org.anta.dto.request;
import lombok.Data;
import org.anta.entity.Product;

@Data
public class ProductVariantRequest {

    private Product product;

    private String sku;

    private String name;

    private Double price;

    private Integer stock;

    private String size;

    private String color;

    private String attributes;

}
