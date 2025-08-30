package com.example.be.service;

import com.example.be.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface RoomService {
    List<Room> getRooms();

    Room getRoom(Long id);

    Room createRoom(Room room, MultipartFile image);

    Room updateRoom(Long id, Room updatedRoom, MultipartFile image);

    void deleteRoom(Long id);
}
