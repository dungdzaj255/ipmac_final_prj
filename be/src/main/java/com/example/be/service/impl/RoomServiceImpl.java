package com.example.be.service.impl;

import com.example.be.model.Room;
import com.example.be.repo.RoomRepository;
import com.example.be.service.RoomService;
import com.example.be.utils.SaveFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

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
    public Room createRoom(Room room, MultipartFile image) {
        if (image != null && !image.isEmpty()) {
            try {
                String imgDr = SaveFile.saveFile(image);
                room.setImage(imgDr);
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
        }
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room updatedRoom, MultipartFile image) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        existingRoom.setRoomName(updatedRoom.getRoomName());
        existingRoom.setPricePerDay(updatedRoom.getPricePerDay());
        existingRoom.setDescription(updatedRoom.getDescription());

        if (image != null && !image.isEmpty()) {
            try {
                String imgDr = SaveFile.saveFile(image);
                existingRoom.setImage(imgDr);
            } catch (IOException e) {
                throw new RuntimeException("Failed to update image", e);
            }
        }

        return roomRepository.save(existingRoom);
    }

    @Override
    public void deleteRoom(Long id) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(existingRoom);
    }
}
