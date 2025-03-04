import axios from "axios";

// Tạo một instance của Axios
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Để gửi kèm cookies HTTP-only
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Interceptor xử lý lỗi 401 (Unauthorized)
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Redirecting to login...");
            // Có thể thực hiện điều hướng về trang đăng nhập tại đây
        }
        return Promise.reject(error);
    }
);

export default api;
