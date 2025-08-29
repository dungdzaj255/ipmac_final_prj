import { createHttpClient } from "./httpClient";


const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";


export const createBookingsApi = (baseUrl = BASE_URL) => {
    const http = createHttpClient(baseUrl);
    return {
        /**
         * Tạo booking cho 1 phòng.
         * @param {{roomId: number|string, nights?: number}} payload
         */
        async create(payload) {
            try {
                const res = await fetch(new URL("/api/bookings", baseUrl), {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error(`POST /api/bookings failed: ${res.status}`);
                return res.json();
            } catch (err) {
// Fallback dev: mô phỏng thành công để demo UI (xoá khi nối BE)
                console.warn("bookingsApi.create fallback:", err?.message);
                return Promise.resolve({ id: Math.random().toString(36).slice(2), ...payload, status: "created" });
            }
        },
    };
};