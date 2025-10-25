package org.anta.service;

import org.anta.dto.request.UserRequest;
import org.anta.dto.response.UserResponse;
import org.anta.entity.User;
import org.anta.mapper.UserMapper;
import org.anta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toResponse)
                .collect(Collectors.toList());
    }


    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException ("User not found with id: " + id));
        return userMapper.toResponse(user);
    }


    public UserResponse addUser(UserRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException ("Username already exists");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException ("Email already exists");
        }

        User user = userMapper.toEntity(req);

        user.setPassword(passwordEncoder.encode(req.getPassword()));

        User saved = userRepository.save(user);

        return userMapper.toResponse(saved);
    }


    public UserResponse updateUser(Long id, UserRequest req) {

        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (req.getUsername() != null && !req.getUsername().equals(existing.getUsername())
                && userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (req.getEmail() != null && !req.getEmail().equals(existing.getEmail())
                && userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        userMapper.updateEntityFromRequest(req, existing);

        if (req.getPassword() != null && !req.getPassword().isEmpty()) {
            existing.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        User saved = userRepository.save(existing);
        return userMapper.toResponse(saved);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }



}
