package com.example.be.service.impl;

import com.example.be.model.BookingOrder;
import com.example.be.model.Room;
import com.example.be.model.User;
import com.example.be.repo.BookingRepository;
import com.example.be.repo.RoomRepository;
import com.example.be.repo.UserRepository;
import com.example.be.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<BookingOrder> getBookingOrders() {
        return bookingRepository.findAll();
    }

    @Override
    public BookingOrder getBookingOrder(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @Override
    public BookingOrder createBookingOrder(BookingOrder bookingOrder) {
        // Lấy thông tin User và Room từ DB
        User user = userRepository.findById(bookingOrder.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Room room = roomRepository.findById(bookingOrder.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Tính số ngày
        long diffInMillies = bookingOrder.getToDate().getTime() - bookingOrder.getFromDate().getTime();
        long days = Math.max(1, (diffInMillies / (1000 * 60 * 60 * 24)));

        // Tính tổng giá
        double totalPrice = days * room.getPricePerDay();

        bookingOrder.setUser(user);
        bookingOrder.setRoom(room);
        bookingOrder.setTotalPrice(totalPrice);

        return bookingRepository.save(bookingOrder);
    }
}
