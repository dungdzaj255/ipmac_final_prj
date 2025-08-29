import { createHttpClient } from "./httpClient";
import { mockRooms } from "./mockRooms";


const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";


export const createRoomsApi = (baseUrl = BASE_URL) => {
    const http = createHttpClient(baseUrl);
    return {
        /**
         * Lấy danh sách phòng.
         * @param {{available?: boolean, q?: string}} [params]
         * @returns {Promise<import('../types/room').Room[]>}
         */
        async list(params) {
            try {
                return await http.get("/api/rooms", { params });
            } catch (err) {
                console.warn("roomsApi.list fallback to mock due to:", err?.message);
                return mockRooms; // fallback để FE chạy được khi BE chưa sẵn
            }
        },
    };
};