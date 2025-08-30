import React, {useState} from "react";
import api from "../api/adminApi";

export default function RoomFormModal({room, onClose, onSuccess}) {
    const [form, setForm] = useState({
        roomName: room?.roomName || "",
        pricePerDay: room?.pricePerDay || "",
        image: room?.image || "",
        description: room?.description || "",
        available: room?.available ?? true,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm({...form, [name]: type === "checkbox" ? checked : value});
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        const previewUrl = URL.createObjectURL(selectedFile);
        setForm({...form, image: previewUrl});
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("room", new Blob([JSON.stringify({
                roomName: form.roomName,
                pricePerDay: form.pricePerDay,
                description: form.description,
                available: form.available
            })], { type: "application/json" }));

            if (file) {
                formData.append("image", file);
            }

            if (room) {
                await api.updateRoom(room.id, formData); // Update API để gửi multipart
            } else {
                await api.createRoom(formData);
            }

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Error saving room:", error);
        }
    };


    return (
        <div style={{background: "#fff", padding: "20px", border: "1px solid #ccc"}}>
            <h3>{room ? "Sửa phòng" : "Thêm phòng"}</h3>
            <form onSubmit={handleSubmit}>
                <input name="roomName" value={form.roomName} onChange={handleChange} placeholder="Tên phòng"/>
                <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange}
                       placeholder="Giá/ngày"/>

                {/* Upload ảnh */}
                <div>
                    <input type="file" accept="image/*" onChange={handleFileChange}/>
                    {form.image && <img src={form.image} alt="Preview" style={{width: "100px", marginTop: "10px"}}/>}
                </div>

                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Mô tả"/>
                <label>
                    <input type="checkbox" name="available" checked={form.available} onChange={handleChange}/>
                    Có sẵn
                </label>
                <button type="submit">Lưu</button>
                <button type="button" onClick={onClose}>Hủy</button>
            </form>
        </div>
    );
}
