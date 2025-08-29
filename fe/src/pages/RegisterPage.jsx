export default function RegisterPage() {
    return (
        <main className="container form-page">
            <h1>Đăng ký</h1>
            <form className="card form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Họ và tên
                    <input type="text" placeholder="Nguyễn Văn A" required />
                </label>
                <label>
                    Email
                    <input type="email" placeholder="you@example.com" required />
                </label>
                <label>
                    Mật khẩu
                    <input type="password" required />
                </label>
                <button className="btn btn-primary" type="submit">Tạo tài khoản</button>
            </form>
        </main>
    );
}