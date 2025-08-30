import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HeaderBar() {
    const { user, logout } = useAuth();

    return (
        <div className="topbar">
            <div className="topbar-inner container">
                <Link className="brand btn" to="/">Khách Sạn Mùa Thu</Link>

                <div className="topbar-actions">
                    {user ? (
                        <>
                            {user.isAdmin ? (
                                <Link to="/admin" className="btn btn-warning">
                                    Admin Dashboard
                                </Link>
                            ) : (
                                <span className="welcome-text brand">
                                    Xin chào, {user.fullName}
                                </span>
                            )}
                            <button onClick={logout} className="btn btn-outline">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
