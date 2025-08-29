package com.example.be.repo;

import com.example.be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByPhone(String phone);
}
