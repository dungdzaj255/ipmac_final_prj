import { useEffect, useMemo, useState } from "react";
import { createRoomsApi } from "../api/roomsApi";
import RoomGrid from "../components/RoomGrid";
import SkeletonCard from "../components/SkeletonCard";
import "../styles/home.css";


const api = createRoomsApi();


export default function HomePage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [q, setQ] = useState("");


    useEffect(() => {
        let active = true;
        (async () => {
            try {
                const data = await api.list();
                if (active) setRooms(data);
            } catch (e) {
                setError(e?.message || "Không thể tải danh sách phòng");
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => {
            active = false;
        };
    }, []);


    const filtered = useMemo(() => {
        const term = q.trim().toLowerCase();
        if (!term) return rooms;
        return rooms.filter((r) =>
            [r.name, String(r.beds), String(r.capacity)].some((x) => String(x).toLowerCase().includes(term))
        );
    }, [q, rooms]);


    return (
        <main className="container">
            <header className="hero">
                <h1>Đặt phòng khách sạn</h1>
                <p className="muted">Tìm phòng phù hợp cho chuyến đi của bạn.</p>
                <input
                    className="search"
                    type="search"
                    placeholder="Tìm theo tên phòng, số giường, sức chứa..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    aria-label="Tìm phòng"
                />
            </header>


            {error && <div className="error">{error}</div>}


            {loading ? (
                <section className="grid">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </section>
            ) : (
                <RoomGrid rooms={filtered} />
            )}
        </main>
    );
}