package com.example.be.repo;

import com.example.be.model.BookingOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingOrder, Long> {
}
