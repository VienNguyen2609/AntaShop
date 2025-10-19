package org.anta.cart_service.mapper;


import org.anta.cart_service.dto.response.CartsResponse;

import org.anta.cart_service.entity.Carts;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface CartsMapper {
    CartsResponse toResponse(Carts carts);
}
