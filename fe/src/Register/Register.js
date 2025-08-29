import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password và Confirm Password phải giống nhau!');
            return;
        }

        const payload = {
            fullName,
            phone,
            password,
            isAdmin: false,
        };

        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Đăng ký thành công!');
                navigate('/login');  // ✅ Điều hướng sang trang login
            } else {
                const errorData = await response.json();
                alert(`Lỗi: ${errorData.message || 'Đăng ký thất bại'}`);
            }
        } catch (error) {
            alert(`Lỗi kết nối đến server: ${error.message}`);
        }
    };

    return (
        <div className="register-wrapper">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-heading">
                    <h1>Khách Sạn Mùa Thu</h1>
                    <p>Tạo tài khoản mới của bạn</p>
                </div>

                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn-primary">REGISTER</button>
            </form>
        </div>
    );
}

export default Register;
