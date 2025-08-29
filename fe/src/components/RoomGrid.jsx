import RoomCard from "./RoomCard";


export default function RoomGrid({ rooms }) {
    if (!rooms?.length) {
        return <p className="muted">Không có phòng nào phù hợp.</p>;
    }
    return (
        <section className="grid" aria-live="polite">
            {rooms.map((r) => (
                <RoomCard key={r.id} room={r} />)
            )}
        </section>
    );
}