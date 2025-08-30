import { useAuth } from '../context/AuthContext';
import {Link} from "react-router-dom";

export default function HeaderBar() {
    const { user, logout } = useAuth();

    return (
        <div className="topbar">
            <div className="topbar-inner container">
                <a className="brand btn" href={"/"}>Khách Sạn Mùa Thu</a>

                <div className="topbar-actions">
                    {user ? (
                        <>
                            <span className="welcome-text brand">Xin chào, {user.fullName}</span>
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
