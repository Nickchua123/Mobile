// contexts/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo context để quản lý trạng thái xác thực của người dùng 
const AuthContext = createContext();

// Component Provider để bao bọc ứng dụng và chia sẻ state
export const AuthProvider = ({ children }) => { // Arrrow Function : Truyền một arr là children
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập (Init ban đầu là false) 
    // Hàm đăng nhập
    const login = () => setIsAuthenticated(true);
    // Hàm đăng xuất
    const logout = () => setIsAuthenticated(false);

    return (

        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
            {/* Bao bọc các components khác  */}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng AuthContext trong các component
// UseContext là một hook cho phép truy cập vào giá trị một Context mà k cần truyền qua giữa các Props
export const useAuth = () => useContext(AuthContext);
