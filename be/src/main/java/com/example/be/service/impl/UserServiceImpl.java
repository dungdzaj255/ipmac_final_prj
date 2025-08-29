package com.example.be.service.impl;

import com.example.be.model.User;
import com.example.be.repo.UserRepository;
import com.example.be.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    @Override
    public User login(String phone, String password) {
        User user = userRepository.findByPhone(phone);
        if (user != null && new BCryptPasswordEncoder().matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    @Override
    public User register(User user) {
        if (userRepository.findByPhone(user.getPhone()) != null) {
            throw new RuntimeException("Phone number already exists");
        }

        String hashedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }
}
