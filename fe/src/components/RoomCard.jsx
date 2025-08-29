import placeholder from "../assets/phong4.jpg"; // có thể thay bằng link ảnh nếu không có file local


const formatCurrency = (n) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);


export default function RoomCard({ room }) {
    const { name, pricePerNight, imageUrl, beds, capacity, rating } = room;
    const src = imageUrl && imageUrl.trim() ? imageUrl : placeholder;


    return (
        <article className="room-card" aria-label={name}>
            <div className="room-img-wrap">
                <img className="room-img" src={src} alt={name} loading="lazy" />
                {rating ? <span className="badge">★ {rating.toFixed(1)}</span> : null}
            </div>
            <div className="room-body">
                <h3 className="room-title">{name}</h3>
                <p className="room-meta">{beds} giường · {capacity} khách</p>
                <p className="room-price">{formatCurrency(pricePerNight)}/đêm</p>
            </div>
        </article>
    );
}