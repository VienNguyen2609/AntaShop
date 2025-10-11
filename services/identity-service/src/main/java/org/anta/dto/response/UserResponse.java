package org.anta.dto.response;

import org.anta.entity.Role;
import lombok.Data;
@Data
public class UserResponse {

        private Long id ;

        private String username;

        private String password;

        private String email;
        
        private Role role;
}
