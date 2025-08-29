import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderBar() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="topbar">
            <div className="topbar-inner container">
                <Link to="/" className="brand" aria-label="Về trang chủ">
                    Khách Sạn Mùa Thu
                </Link>

                <div className="topbar-actions">
                    {user ? (
                        <>
                            <span className="welcome-text">Xin chào, {user.fullName}</span>
                            <button onClick={handleLogout} className="btn btn-outline">
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
