import React, { useEffect, useState } from "react";
import  api from "../api/adminApi";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await api.getBookings();
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Danh sách Booking</h2>
            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>SĐT</th>
                    <th>Phòng</th>
                    <th>Từ ngày</th>
                    <th>Đến ngày</th>
                    <th>Tổng tiền</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map(b => (
                    <tr key={b.id}>
                        <td>{b.id}</td>
                        <td>{b.user?.fullName || "N/A"}</td>
                        <td>{b.user.phone}</td>
                        <td>{b.room?.roomName}</td>
                        <td>{b.fromDate}</td>
                        <td>{b.toDate}</td>
                        <td>{b.totalPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
