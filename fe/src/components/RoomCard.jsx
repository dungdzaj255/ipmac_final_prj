import { useState } from "react";
import placeholder from "../assets/phong4.jpg";
import { createBookingsApi } from "../api/bookingsApi";


const bookingApi = createBookingsApi();
const formatCurrency = (n) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);


export default function RoomCard({ room }) {
    const { name, pricePerNight, imageUrl, beds, capacity, rating, shortDesc, status } = room;
    const src = imageUrl && imageUrl.trim() ? imageUrl : placeholder;


    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");


    const available = (status || "available") === "available";


    const handleOrder = async () => {
        if (!available || submitting) return;
        setSubmitting(true);
        setMessage("");
        try {
            await bookingApi.create({ roomId: room.id, nights: 1 });
            setMessage("Đặt phòng thành công!");
        } catch (e) {
            setMessage("Đặt phòng thất bại. Vui lòng thử lại.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <article className="room-card" aria-label={name}>
            <div className="room-img-wrap">
                <img className="room-img" src={src} alt={name} loading="lazy" />
                {rating ? <span className="badge">★ {rating.toFixed(1)}</span> : null}
            </div>
            <div className="room-body">
                <h3 className="room-title">{name}</h3>
                <p className="room-meta">{beds} giường · {capacity} khách</p>
                {shortDesc ? <p className="room-desc">{shortDesc}</p> : null}
                <p className="room-price">{formatCurrency(pricePerNight)}/đêm</p>


                <div className="room-footer">
<span className={available ? "status-badge ok" : "status-badge not"}>
{available ? "available" : "not available"}
</span>
                    <button
                        className="btn btn-primary btn-cta"
                        onClick={handleOrder}
                        disabled={!available || submitting}
                    >
                        {submitting ? "Processing..." : "Order Now"}
                    </button>
                </div>
                {message && <div className="hint">{message}</div>}
            </div>
        </article>
    );
}