import React, {useState} from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

function Login({onNavigate}) {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            phone,
            password
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                login(data); // cập nhật context và localStorage
                navigate("/");
            } else {
                const errorData = await response.json();
                alert(`Lỗi: ${errorData.message || 'Đăng nhập thất bại'}`);
            }
        } catch (error) {
            alert(`Lỗi kết nối server: ${error.message}`);
        }
    };


    return (
        <div className="login-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-heading">
                    <h1>Khách Sạn Mùa Thu</h1>
                    <p>Hãy đăng nhập tài khoản của bạn</p>
                </div>

                <input
                    type="text"
                    placeholder="Số Điện Thoai"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật Khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="login-options">
                    <label>
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <a href="#!" className="forgot-link">Forgot password?</a>
                </div>

                <button type="submit" className="btn-primary">SIGN IN</button>

            </form>
        </div>
    );
}

export default Login;
