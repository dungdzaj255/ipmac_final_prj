import { Link } from "react-router-dom";


export default function HeaderBar() {
    return (
        <div className="topbar">
            <div className="topbar-inner container">
                {/* Brand bên trái */}
                <Link to="/" className="brand" aria-label="Về trang chủ">
                    Khách Sạn Mùa Thu
                </Link>


                {/* Actions bên phải */}
                <div className="topbar-actions">
                    <Link to="/login" className="btn btn-outline">Login</Link>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </div>
            </div>
        </div>
    );
}