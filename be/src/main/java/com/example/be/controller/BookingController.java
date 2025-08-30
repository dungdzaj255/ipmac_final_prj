package com.example.be.controller;

import com.example.be.model.BookingOrder;
import com.example.be.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
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

    @PostMapping(consumes = {"application/json", "application/json;charset=UTF-8"})
    public ResponseEntity<?> createBooking(@RequestBody BookingOrder bookingOrder) {
        try {
            BookingOrder newBooking = bookingService.createBookingOrder(bookingOrder);
            bookingOrder.getUser().getBookingOrders().clear();
            return ResponseEntity.status(HttpStatus.OK).body(newBooking);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

