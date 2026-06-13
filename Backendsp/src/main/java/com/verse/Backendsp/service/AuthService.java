package com.verse.Backendsp.service;

import com.verse.Backendsp.dto.request.SignupRequest;
import com.verse.Backendsp.model.User;

public interface AuthService {
    User registerUser(SignupRequest request);
    User authenticate(String email, String password);
}
