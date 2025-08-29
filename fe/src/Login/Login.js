import React, { useState } from 'react';
import './Login.css';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thay bằng API đăng nhập thực tế
    console.log({ email, password, remember });

    // Giả sử đăng nhập thành công
    onNavigate('home');
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-heading">
          <h1>Khách Sạn Mùa Thu</h1>
          <p>Hãy đăng nhập tài khoản của bạn</p>
        </div>

        <input
          type="email"
          placeholder="Số Điện Thoai"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <p className="register-text">
          Not a member?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => onNavigate('register')}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
