package org.anta.cart_service.mapper;

import org.anta.cart_service.dto.request.CartItemsRequest;
import org.anta.cart_service.dto.response.CartItemsResponse;
import org.anta.cart_service.entity.CartItems;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartItemsMapper {
    CartItemsResponse toResponse(CartItems cart_items);

    CartItems toEntity(CartItemsRequest request);
}
