import axios from "axios";

const API_BASE = "http://localhost:8080/api"; // đổi thành backend của bạn

export const getRooms = () => axios.get(`${API_BASE}/rooms`);
export const createRoom = (roomData) =>
    axios.post(`${API_BASE}/rooms`, roomData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
export const updateRoom = (id, roomData) =>
    axios.put(`${API_BASE}/rooms/${id}`, roomData, {
    headers: {
        "Content-Type": "multipart/form-data"
    }
});
export const deleteRoom = (id) => axios.delete(`${API_BASE}/rooms/${id}`);

export const getBookings = () => axios.get(`${API_BASE}/bookings`);

const api = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    getBookings
};

export default api;
