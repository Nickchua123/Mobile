import React, { createContext, useState, useContext } from 'react';

// Tạo AddressContext để quản lý danh sách địa chỉ
const AddressContext = createContext();

// Dữ liệu mặc định, bạn có thể load từ file JSON hoặc từ backend nếu cần
const initialAddresses = require('../data/dataAddress.json');  // Import dữ liệu từ JSON

// Provider để cung cấp dữ liệu địa chỉ cho các component con
export const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState(initialAddresses);  // Lưu trữ địa chỉ ban đầu

    // Thêm địa chỉ mới vào danh sách địa chỉ 
    const addAddress = (newAddress) => {
        // Nếu địa chỉ mới được đánh dấu là mặc định, reset các địa chỉ khác
        if (newAddress.isDefault) {
            const updatedAddresses = addresses.map(address => ({
                ...address,
                isDefault: false  // Reset tất cả các địa chỉ thành không mặc định
            }));
            updatedAddresses.push(newAddress); // Thêm địa chỉ mới vào
            setAddresses(updatedAddresses);
        } else {
            setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
        }
    };

    // Hàm để cập nhật địa chỉ và đảm bảo chỉ có một địa chỉ mặc định
    const updateAddress = (updatedAddress) => {
        const updatedAddresses = addresses.map((address) => {
            if (address.id === updatedAddress.id) {
                return { ...address, ...updatedAddress }; // Cập nhật địa chỉ
            }
            return address;
        });

        // Nếu địa chỉ được đánh dấu là mặc định, reset tất cả các địa chỉ khác
        if (updatedAddress.isDefault) {
            updatedAddresses.forEach((address) => {
                if (address.id !== updatedAddress.id) {
                    address.isDefault = false; // Reset địa chỉ khác thành không mặc định
                }
            });
        }

        setAddresses(updatedAddresses);
    };

    return (
        <AddressContext.Provider value={{ addresses, addAddress, updateAddress }}>
            {children}
        </AddressContext.Provider>
    );
};

// Hook để sử dụng context
export const useAddress = () => useContext(AddressContext);
