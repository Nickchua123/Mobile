import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

export default function ProfileScreen({ navigation }) {
    const handleLogout = () => {
        Alert.alert(
            'Xác nhận đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                {
                    text: 'Huỷ',
                    style: 'cancel',
                },
                {
                    text: 'Đăng xuất',
                    style: 'destructive',
                    onPress: () => navigation.replace('Login'),
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            {/* Profile Image and Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/image/Admin.jpg')}
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Phách Nguyễn</Text>
                    <Text style={styles.profileEmail}>thephach5@gmail.com</Text>
                </View>
            </View>

            {/* List of Profile Options */}
            <View style={styles.optionsContainer}>
                {[
                    { label: 'Đơn hàng của tôi', detail: 'Xem thông tin các đơn đã đặt', screen: 'Orders' },
                    { label: 'Địa chỉ đặt hàng', detail: 'Lưu thông tin địa chỉ', screen: 'Address' },
                    { label: 'Phương thức thanh toán', detail: 'Thay đổi phương thức thanh toán', screen: 'PaymentMethod' },
                    { label: 'Đánh giá của tôi', detail: 'Xem các đánh giá', screen: 'MyReviews' },
                    { label: 'Cài đặt', detail: 'Thông báo, mật khẩu, liên hệ', screen: 'Settings' },
                ].map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => navigation.navigate('Profile', { screen: item.screen })}
                    >
                        <View style={styles.optionTextContainer}>
                            <Text style={styles.optionText}>{item.label}</Text>
                            <Text style={styles.optionDetail}>{item.detail}</Text>
                        </View>
                        <Text style={styles.arrowText}>{'>'}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nút đăng xuất đẹp và tách riêng */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
    },
    profileContainer: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 15,
    },
    profileInfo: {
        justifyContent: 'center',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileEmail: {
        fontSize: 14,
        color: '#888',
    },
    optionsContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        elevation: 2,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15,
    },
    optionTextContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '90%',
    },
    optionText: {
        fontSize: 18,
    },
    optionDetail: {
        fontSize: 14,
        color: '#888',
    },
    arrowText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 90,

        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
