export default function LoginPage() {
    return (
        <main className="container form-page">
            <h1>Đăng nhập</h1>
            <form className="card form" onSubmit={(e) => e.preventDefault()}>
                <label>
                    Email
                    <input type="email" placeholder="you@example.com" required />
                </label>
                <label>
                    Mật khẩu
                    <input type="password" required />
                </label>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
        </main>
    );
}