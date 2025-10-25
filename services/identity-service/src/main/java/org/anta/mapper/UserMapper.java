
package org.anta.mapper;

import org.anta.dto.request.UserRequest;
import org.anta.dto.response.UserResponse;
import org.anta.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User user);

    User toEntity(UserRequest userRequest);
}
