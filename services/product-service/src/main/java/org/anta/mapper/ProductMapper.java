package org.anta.mapper;

import org.anta.dto.request.ProductRequest;
import org.mapstruct.Mapper;
import org.anta.entity.Product;
import org.anta.dto.response.ProductResponse;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductResponse toResponse(Product product);

    Product toEntity(ProductRequest request);
}

