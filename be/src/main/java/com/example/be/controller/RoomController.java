package com.example.be.controller;

import com.example.be.model.Room;
import com.example.be.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Lấy tất cả phòng
    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getRooms());
    }

    // Lấy phòng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable Long id) {
        Room room = roomService.getRoom(id);
        if (room != null) {
            return ResponseEntity.ok(room);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Tạo phòng mới
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Room> createRoom(
            @RequestPart("room") Room room,
            @RequestPart(value = "image", required = false) MultipartFile image) {
        Room newRoom = roomService.createRoom(room, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(newRoom);
    }


    // Cập nhật phòng
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Room> updateRoom(
            @PathVariable Long id,
            @RequestPart("room") Room roomDetails,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        Room updatedRoom = roomService.updateRoom(id, roomDetails, image);
        return ResponseEntity.ok(updatedRoom);
    }


    // Xóa phòng
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}

