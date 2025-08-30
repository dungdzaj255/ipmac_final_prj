import React, { useEffect, useState } from "react";
import api from "../api/adminApi";
import RoomFormModal from "./RoomFormModal";

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const fetchRooms = async () => {
        try {
            const res = await api.getRooms();
            setRooms(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa phòng này?")) {
            await api.deleteRoom(id);
            fetchRooms();
        }
    };

    return (
        <div>
            <h2>Quản lý Phòng</h2>
            <button onClick={() => { setSelectedRoom(null); setShowModal(true); }}>
                Thêm phòng
            </button>

            {loading ? <p>Loading...</p> : (
                <table border="1" cellPadding="8">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên phòng</th>
                        <th>Hình ảnh</th>
                        <th>Giá/ngày</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.roomName}</td>
                            <td><img src={room.image} alt={"Ảnh phòng"} width={"300px"}/></td>
                            <td>{room.pricePerDay}</td>
                            <td>{room.available ? "Có sẵn" : "Hết phòng"}</td>
                            <td>
                                <button onClick={() => { setSelectedRoom(room); setShowModal(true); }}>
                                    Sửa
                                </button>
                                <button onClick={() => handleDelete(room.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <RoomFormModal
                    room={selectedRoom}
                    onClose={() => setShowModal(false)}
                    onSuccess={fetchRooms}
                />
            )}
        </div>
    );
}
