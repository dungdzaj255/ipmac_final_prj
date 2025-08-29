package com.example.be.controller;

import com.example.be.model.BookingOrder;
import com.example.be.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingOrder>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getBookingOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        BookingOrder bookingOrder = bookingService.getBookingOrder(id);
        if (bookingOrder == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found");
        } else {
            return ResponseEntity.ok(bookingOrder);
        }
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingOrder bookingOrder) {
        try {
            BookingOrder newBooking = bookingService.createBookingOrder(bookingOrder);
            return ResponseEntity.status(HttpStatus.CREATED).body(newBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

