package com.example.be.service;

import com.example.be.model.BookingOrder;

import java.util.List;
import java.util.Optional;

public interface BookingService {
    List<BookingOrder> getBookingOrders();

    BookingOrder getBookingOrder(Long id);

    BookingOrder createBookingOrder(BookingOrder bookingOrder);
}
