package com.example.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private String password;

    private String fullName;

    private Boolean isAdmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BookingOrder> bookingOrders;
}
