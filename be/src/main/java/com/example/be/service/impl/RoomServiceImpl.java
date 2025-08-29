package com.example.be.service.impl;

import com.example.be.model.Room;
import com.example.be.repo.RoomRepository;
import com.example.be.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<Room> getRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoom(Long id) {
        return roomRepository.findById(id).orElse(null);
    }

    @Override
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room roomDetails) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        existingRoom.setRoomName(roomDetails.getRoomName());
        existingRoom.setPricePerDay(roomDetails.getPricePerDay());
        existingRoom.setImage(roomDetails.getImage());
        existingRoom.setAvailable(roomDetails.getAvailable());
        existingRoom.setDescription(roomDetails.getDescription());

        return roomRepository.save(existingRoom);
    }

    @Override
    public void deleteRoom(Long id) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(existingRoom);
    }
}
