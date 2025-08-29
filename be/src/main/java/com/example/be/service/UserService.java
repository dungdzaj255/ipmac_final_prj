package com.example.be.service;

import com.example.be.model.User;

public interface UserService {
    User getUserByPhone(String phone);

    User login(String phone, String password);

    User register(User user);
}
