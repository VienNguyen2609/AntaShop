package com.example.auth_service.dto.response;

import com.example.auth_service.entity.Role;
import lombok.Data;
@Data
public class UserResponse {

        private Long id ;

        private String username;

        private String password;

        private String email;
        
        private Role role;
}
