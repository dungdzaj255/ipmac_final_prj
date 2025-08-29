package com.example.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String phone;

    private String password;

    private String fullName;

    @Column(nullable = false)
    @ColumnDefault("false")
    private Boolean isAdmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BookingOrder> bookingOrders;
}
