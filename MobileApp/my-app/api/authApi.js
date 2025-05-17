import axiosClient from "./axiosClient";

const authApi = {
    // Gọi API đăng nhập: POST /auth/login
    login: (credentials) => axiosClient.post('/auth/login', credentials),

    // Thêm API đăng ký user mới (createUser theo backend của bạn)
    signUp: (userData) => axiosClient.post('/createUser', userData),

    // Các API khác (register, refresh token, logout) có thể thêm sau
};

export default authApi;
