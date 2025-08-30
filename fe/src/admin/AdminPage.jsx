import { useState } from "react";
import RoomsPage from "./RoomsPage";
import BookingsPage from "./BookingsPage";

export default function AdminPage() {
    const [tab, setTab] = useState("rooms");

    return (
        <div className="admin-container container">
            <h1>Admin Dashboard</h1>
            <div className="tabs">
                <button
                    className={`btn ${tab === "rooms" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setTab("rooms")}
                >
                    Quản lý Phòng
                </button>
                <button
                    className={`btn ${tab === "bookings" ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setTab("bookings")}
                >
                    Xem Booking Orders
                </button>
            </div>

            <div className="tab-content">
                {tab === "rooms" && <RoomsPage />}
                {tab === "bookings" && <BookingsPage />}
            </div>
        </div>
    );
}
