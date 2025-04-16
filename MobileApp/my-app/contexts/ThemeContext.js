import React, { createContext, useState } from 'react';

// Tạo Context cho theme
const ThemeContext = createContext();

// Component ThemeProvider
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('Dark'); // Giá trị mặc định là 'Dark'

    // Hàm toggle theme
    const toggleTheme = () => {
        setTheme(theme === 'Dark' ? 'Light' : 'Dark');
    };

    // Cung cấp giá trị theme và toggleTheme cho các component con
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeProvider };
