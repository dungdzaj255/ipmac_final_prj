import {useState} from "react";
import placeholder from "../assets/no_img.png";
import {createBookingsApi} from "../api/bookingsApi";
import {useAuth} from "../context/AuthContext";

const bookingApi = createBookingsApi();
const formatCurrency = (n) =>
    new Intl.NumberFormat(undefined, {style: "currency", currency: "USD"}).format(n);

export default function RoomCard({room}) {
    const {roomName, pricePerDay, image, description, available} = room;
    const rating = 5;
    const src = image && image.trim() ? image : placeholder;
    const {user} = useAuth();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [finalMessage, setFinalMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleOpenModal = () => {
        if (!available) return;
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setMessage("");
        setStartDate("");
        setEndDate("");
    };

    const calculateNights = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diff = end - start;
        return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
    };

    const handleConfirmBooking = async () => {
        const nights = calculateNights();
        const today = new Date(Date.now()).setHours(0, 0, 0, 0);
        if (today > Date.parse(startDate)) {
            setMessage("Ngày bắt đầu phải lớn hơn hoặc bằng ngày hiện tại!");
            return;
        }
        if (nights <= 0) {
            setMessage("Ngày kết thúc phải sau ngày bắt đầu!");
            return;
        }

        const payload = {
            fromDate: startDate,
            toDate: endDate,
            user: {
                id: user.id
            },
            room: {
                id: room.id
            }
        };

        setSubmitting(true);
        setMessage("");

        try {
            await bookingApi.create(payload);
            setFinalMessage("Đặt phòng thành công!");
        } catch (e) {
            setFinalMessage("Đặt phòng thất bại. Vui lòng thử lại.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <article className="room-card" aria-label={roomName}>
            <div className="room-img-wrap">
                <img className="room-img" src={src} alt={roomName} loading="lazy"/>
                {rating ? <span className="badge">★ {rating.toFixed(1)}</span> : null}
            </div>
            <div className="room-body">
                <h3 className="room-title">{roomName}</h3>
                {description ? <p className="room-desc">{description}</p> : null}
                <p className="room-price">{formatCurrency(pricePerDay)}/đêm</p>

                <div className="room-footer">
          <span className={available ? "status-badge ok" : "status-badge not"}>
            {available ? "available" : "not available"}
          </span>
                    <button
                        className="btn btn-primary btn-cta"
                        onClick={handleOpenModal}
                        disabled={!user || !available || submitting}
                    >
                        Order Now
                    </button>
                </div>
                {finalMessage && <div className="hint">{finalMessage}</div>}
            </div>

            {/* Modal chọn ngày */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Chọn ngày đặt phòng</h3>
                        <label>
                            Từ ngày:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <br/>
                        <label>
                            Đến ngày:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                        <p>
                            Số đêm: <strong>{calculateNights()}</strong>
                        </p>
                        <div className="modal-actions">
                            <button onClick={handleCloseModal} className="btn btn-secondary">
                                Hủy
                            </button>
                            <button
                                onClick={handleConfirmBooking}
                                className="btn btn-primary"
                                disabled={submitting}
                            >
                                {submitting ? "Processing..." : "Xác nhận"}
                            </button>
                        </div>
                        {message && <div className="hint">{message}</div>}
                    </div>
                </div>
            )}
        </article>
    );
}
