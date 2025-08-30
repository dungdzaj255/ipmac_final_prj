package com.example.be;

import com.example.be.model.User;
import com.example.be.repo.UserRepository;
import com.example.be.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BeApplication {

    private final UserService userService;

    public BeApplication(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    public void initAdmin() {
        userService.initAdmin();
    }

    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }
}
