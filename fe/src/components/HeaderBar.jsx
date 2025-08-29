import { Link } from "react-router-dom";


export default function HeaderBar() {
    return (
        <div className="topbar">
            <div className="topbar-inner container">
                <div className="spacer" />
                <div className="topbar-actions">
                    <Link to="/login" className="btn btn-outline">Login</Link>
                    <Link to="/register" className="btn btn-primary">Register</Link>
                </div>
            </div>
        </div>
    );
}