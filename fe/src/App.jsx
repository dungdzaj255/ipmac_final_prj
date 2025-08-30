import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeaderBar from "./components/HeaderBar";
import Login from "./Login/Login";
import Register from "./Register/Register";
import AdminPage from "./admin/AdminPage"; // Tạo file này
import { AuthProvider, useAuth } from './context/AuthContext';

function PrivateAdminRoute({ children }) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (!user.isAdmin) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/admin"
                        element={
                            <PrivateAdminRoute>
                                <AdminPage />
                            </PrivateAdminRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
