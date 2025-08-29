import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeaderBar from "./components/HeaderBar";
import Login from "./Login/Login";
import Register from "./Register/Register";


export default function App() {

    return (
        <BrowserRouter>
            <HeaderBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}