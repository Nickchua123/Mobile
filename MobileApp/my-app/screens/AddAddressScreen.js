import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';

export default function AddAddressScreen({ navigation }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    // Hàm để lưu địa chỉ
    const handleSaveAddress = () => {
        if (name === '' || address === '') {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // Tạo địa chỉ mới và thêm vào danh sách hoặc lưu vào backend nếu cần
        const newAddress = {
            id: Math.random().toString(36).substring(7), // Tạo ID ngẫu nhiên
            name,
            address,
            isDefault
        };

        // Thực hiện hành động lưu (ví dụ: lưu vào danh sách địa chỉ hoặc backend)
        console.log('Địa chỉ mới:', newAddress);

        // Điều hướng về màn hình danh sách địa chỉ (giả sử là "ShippingAddressScreen")
        navigation.goBack(); // Hoặc điều hướng đến màn hình địa chỉ của bạn
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thêm Địa Chỉ Mới</Text>

            {/* Tên */}
            <TextInput
                style={styles.input}
                placeholder="Nhập tên người nhận"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            {/* Địa chỉ */}
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ"
                value={address}
                onChangeText={(text) => setAddress(text)}
            />

            {/* Switch để chọn địa chỉ mặc định */}
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Đặt làm địa chỉ mặc định</Text>
                <Switch
                    value={isDefault}
                    onValueChange={() => setIsDefault(!isDefault)}  // Toggle giá trị của Switch
                />
            </View>

            {/* Nút lưu địa chỉ */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
                <Text style={styles.saveText}>Lưu Địa Chỉ</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 14,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
