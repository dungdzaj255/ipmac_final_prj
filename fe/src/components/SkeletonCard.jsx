export default function SkeletonCard() {
    return (
        <div className="room-card skeleton">
            <div className="room-img" />
            <div className="room-body">
                <div className="line w-70" />
                <div className="line w-50" />
                <div className="line w-40" />
            </div>
        </div>
    );
}