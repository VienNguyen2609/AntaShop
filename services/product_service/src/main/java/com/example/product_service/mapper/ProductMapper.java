package com.example.product_service.mapper;

import com.example.product_service.dto.request.ProductRequest;
import org.mapstruct.Mapper;
import com.example.product_service.entity.Product;
import com.example.product_service.dto.response.ProductResponse;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductResponse toResponse(Product product);

    Product toEntity(ProductRequest request);
}

