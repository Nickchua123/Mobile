import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function OrdersScreen() {
    const [selectedTab, setSelectedTab] = useState('Delivered'); // Mặc định tab "Delivered"

    // Danh sách các đơn hàng
    const orders = [
        { orderNo: 'Order No238562312', date: '20/03/2020', quantity: 3, totalAmount: 150, status: 'Delivered' },
        { orderNo: 'Order No238562313', date: '21/03/2020', quantity: 2, totalAmount: 120, status: 'Processing' },
        { orderNo: 'Order No238562314', date: '22/03/2020', quantity: 5, totalAmount: 250, status: 'Cancelled' },
        { orderNo: 'Order No238562315', date: '23/03/2020', quantity: 4, totalAmount: 200, status: 'Delivered' },
        { orderNo: 'Order No238562316', date: '24/03/2020', quantity: 1, totalAmount: 50, status: 'Processing' },
    ];

    // Bộ lọc đơn hàng theo trạng thái
    const filteredOrders = orders.filter(order => {
        if (selectedTab === 'Delivered') return order.status === 'Delivered';
        if (selectedTab === 'Processing') return order.status === 'Processing';
        if (selectedTab === 'Cancelled') return order.status === 'Cancelled';
        return true;
    });

    return (
        <View style={styles.container}>
            {/* Thanh Tab */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Delivered' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Delivered')}
                >
                    <Text style={styles.tabText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Processing' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Processing')}
                >
                    <Text style={styles.tabText}>Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, selectedTab === 'Cancelled' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Cancelled')}
                >
                    <Text style={styles.tabText}>Cancelled</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách đơn hàng */}
            <ScrollView style={styles.ordersList}>
                {filteredOrders.map((order, index) => (
                    <View key={index} style={styles.orderCard}>
                        <View style={styles.infor}>
                            <Text style={styles.orderNo}>{order.orderNo}</Text>
                            <Text style={styles.orderDate}>{order.date}</Text>
                        </View>
                        <Text style={styles.orderQuantity}>Quantity: {order.quantity}</Text>
                        <Text style={styles.orderAmount}>Total Amount: ${order.totalAmount}</Text>
                        <View style={styles.buttonRowwithStatus}>
                            <TouchableOpacity style={styles.detailButton}>
                                <Text style={styles.detailButtonText}>Detail</Text>
                            </TouchableOpacity>
                            <Text style={[styles.status, order.status === 'Delivered' && styles.delivered,
                            order.status === 'Cancelled' && styles.cancelled
                                , order.status === 'Processing' && styles.processing]}>
                                {order.status}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingTop: 5,
        alignItems: 'center',

        justifyContent: 'center',
        // backgroundColor: '#ddd',
        borderRadius: 5,
        borderBottomWidth: 3, // Thêm đường viền dưới
        borderBottomColor: 'transparent', // Mặc định không có màu viền
        margin: 5,
    },
    selectedTab: {
        // backgroundColor: '#3498db',
        borderBottomColor: '#242424', // Màu viền dưới khi tab được chọn
    },
    tabText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242424',
    },
    ordersList: {
        marginTop: 20,
    },
    orderCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 2, // Android shadow effect
    },
    infor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: 14,
        color: '#888',
    },
    orderQuantity: {
        fontSize: 14,
    },
    orderAmount: {
        fontSize: 14,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    delivered: {
        color: 'green',
    },
    processing: {
        color: 'orange',
    },
    cancelled: {
        color: 'red',
    },
    detailButton: {
        marginTop: 10,
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        width: 80,
        height: 20,
        textAlign: 'center'
    },
    buttonRowwithStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
