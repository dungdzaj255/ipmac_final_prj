package com.example.be.service;

import com.example.be.model.Room;

import java.util.List;

public interface RoomService {
    List<Room> getRooms();

    Room getRoom(Long id);

    Room createRoom(Room room);

    Room updateRoom(Long id, Room roomDetails);

    void deleteRoom(Long id);
}
