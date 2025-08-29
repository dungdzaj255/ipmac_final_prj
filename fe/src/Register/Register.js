import React, { useState } from 'react';
import './Register.css';

function Register({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password và Confirm Password phải giống nhau!');
      return;
    }

    // Thay bằng API đăng ký thực tế
    console.log({ name, email, password });

    // Giả sử đăng ký thành công thì chuyển về login
    onNavigate('login');
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <p className="login-text">
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => onNavigate('login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
