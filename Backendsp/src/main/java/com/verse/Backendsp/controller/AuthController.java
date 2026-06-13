package com.verse.Backendsp.controller;

import com.verse.Backendsp.dto.request.LoginRequest;
import com.verse.Backendsp.dto.request.SignupRequest;
import com.verse.Backendsp.dto.response.AuthResponse;
import com.verse.Backendsp.dto.response.UserResponse;
import com.verse.Backendsp.mapper.UserMapper;
import com.verse.Backendsp.service.AuthService;
import com.verse.Backendsp.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
        try {
            var user = authService.registerUser(request);
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());
            UserResponse userResponse = userMapper.toDto(user);
            return ResponseEntity.ok(new AuthResponse(token, userResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            var user = authService.authenticate(request.getEmail(), request.getPassword());
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());
            UserResponse userResponse = userMapper.toDto(user);
            return ResponseEntity.ok(new AuthResponse(token, userResponse));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
