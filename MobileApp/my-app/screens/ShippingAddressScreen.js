import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ShippingAddressScreen({ navigation }) {
    // State lưu trữ các địa chỉ
    const [addresses, setAddresses] = useState([]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shipping Address</Text>
            <ScrollView>
                {/* Hiển thị danh sách các địa chỉ */}
                {addresses.map((address) => (
                    <View key={address.id} style={styles.addressCard}>
                        <Text style={styles.addressName}>{address.name}</Text>
                        <Text style={styles.addressText}>{address.address}</Text>
                        {address.isDefault && (
                            <Text style={styles.defaultText}>Default Address</Text>
                        )}
                    </View>
                ))}
            </ScrollView>

            {/* Nút để điều hướng tới màn hình thêm địa chỉ */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddAddress')} // Điều hướng đến AddAddressScreen
            >
                <Text style={styles.addText}>+ Add New Address</Text>
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
    addressCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2, // Android shadow effect
    },
    addressName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 14,
        color: '#888',
    },
    defaultText: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
