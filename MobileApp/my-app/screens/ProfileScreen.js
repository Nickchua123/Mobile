import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Profile Image and Info */}
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/image/Admin.jpg')} // Đảm bảo đường dẫn ảnh chính xác
                    style={styles.profileImage}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Phách Nguyễn</Text>
                    <Text style={styles.profileEmail}>thephach5@gmail.com</Text>
                </View>
            </View>

            {/* List of Profile Options */}
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('Profile', { screen: 'Orders' })}
                    //Orders
                
                >
                    {/* Option */}
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>Đơn hàng của tôi</Text>
                        <Text style={styles.optionDetail}>Xem thông tin các đơn đã đặt</Text>
                    </View>
                    <Text style={styles.arrowText}> {'>'} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('Profile', { screen: 'Address' })}

                >
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>Địa chỉ đặt hàng</Text>
                        <Text style={styles.optionDetail}>Lưu thông tin địa chỉ</Text>
                    </View>
                    <Text style={styles.arrowText}> {'>'} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('Profile', { screen: 'PaymentMethod' })}

                    // Điều hướng đến PaymentMethod Screen
                >
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>Phương thức thanh toán</Text>
                        <Text style={styles.optionDetail}>Thay đổi phương thức thanh toán</Text>
                    </View>
                    <Text style={styles.arrowText}> {'>'} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('MyReviews')} // Điều hướng đến Reviews Screen
                >
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>Đánh giá của tôi</Text>
                        <Text style={styles.optionDetail}>Xem các đánh giá</Text>
                    </View>
                    <Text style={styles.arrowText}> {'>'} </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.option}
                    onPress={() => navigation.navigate('Settings')} // Điều hướng đến Settings Screen
                >
                    <View style={styles.optionTextContainer}>
                        <Text style={styles.optionText}>Cài đặt</Text>
                        <Text style={styles.optionDetail}>Thông báo, mật khẩu, liên hệ</Text>
                    </View>
                    <Text style={styles.arrowText}> {'>'} </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 105,
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
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
        elevation: 2, // Android shadow effect
    },
    option: {
        flexDirection: 'row', // Đảm bảo các mục được hiển thị theo hàng ngang
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 15,
        paddingBottom: 30
    },
    optionTextContainer: {
        flexDirection: 'column', // Các văn bản được hiển thị theo hàng ngang
        justifyContent: 'space-between',
        width: '90%', // Điều chỉnh kích thước
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
        //    color: '#888',
    },
});
