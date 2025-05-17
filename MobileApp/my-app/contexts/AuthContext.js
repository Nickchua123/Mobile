import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // để chờ kiểm tra token

    // Khi app mở, kiểm tra token trong AsyncStorage
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                setIsAuthenticated(!!token); // true nếu có token
            } catch (err) {
                console.error('Lỗi kiểm tra token:', err);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    // Gọi khi đăng nhập thành công
    const login = async (token) => {
        await AsyncStorage.setItem('accessToken', token);
        setIsAuthenticated(true);
    };

    // Gọi khi đăng xuất
    const logout = async () => {
        await AsyncStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
