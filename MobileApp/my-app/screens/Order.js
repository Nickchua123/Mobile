import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import orderApi from '../api/orderApi';

export default function OrdersScreen() {
    const [orders, setOrders] = useState([]);
    const [selectedTab, setSelectedTab] = useState('Delivered');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await orderApi.getMyOrders();
            setOrders(res.data.data.content || []);
        } catch (error) {
            console.error('Lỗi lấy đơn hàng:', error);
        }
    };

    const handleCancelOrder = async (id) => {
        Alert.alert('Xác nhận', 'Bạn có chắc muốn huỷ đơn hàng này?', [
            { text: 'Không', style: 'cancel' },
            {
                text: 'Huỷ', style: 'destructive', onPress: async () => {
                    try {
                        await orderApi.cancelOrder(id);
                        fetchOrders();
                        Alert.alert('Huỷ thành công', 'Đơn hàng đã được huỷ.');
                    } catch (e) {
                        console.error('Lỗi huỷ đơn:', e);
                    }
                }
            }
        ]);
    };

    const handleViewDetail = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const mapStatus = (status) => {
        switch (status) {
            case 'SUCCESS': return 'Delivered';
            case 'PENDING': return 'Processing';
            case 'FAILED': return 'Cancelled';
            default: return 'Unknown';
        }
    };

    const filteredOrders = orders.filter(order => {
        const statusLabel = mapStatus(order.paymentStatus);
        return statusLabel === selectedTab;
    });

    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {['Processing', 'Delivered', 'Cancelled'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={[styles.tab, selectedTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={{ marginTop: 15 }}>
                {filteredOrders.length === 0 ? (
                    <Text style={styles.empty}>No orders found.</Text>
                ) : (
                    filteredOrders.map((order) => (
                        <View key={order.id} style={styles.orderCard}>
                            <Text style={styles.orderId}>Order #{order.id}</Text>
                            <Text style={styles.detail}>Recipient: {order.customerName}</Text>
                            <Text style={styles.detail}>Total: {order.totalAmount.toLocaleString()} VND</Text>
                            <Text style={styles.detail}>Payment: {mapStatus(order.paymentStatus)}</Text>
                            <Text style={styles.detail}>Shipping: {order.shippingMethod}</Text>
                            <Text style={styles.detail}>Date: {new Date(order.orderDate).toLocaleDateString()}</Text>

                            <TouchableOpacity
                                onPress={() => handleViewDetail(order)}
                                style={styles.detailBtn}
                            >
                                <Text style={styles.detailBtnText}>Xem chi tiết</Text>
                            </TouchableOpacity>

                            {selectedTab === 'Processing' && (
                                <TouchableOpacity
                                    onPress={() => handleCancelOrder(order.id)}
                                    style={[styles.detailBtn, { backgroundColor: 'red' }]}
                                >
                                    <Text style={styles.detailBtnText}>Huỷ đơn hàng</Text>
                                </TouchableOpacity>
                            )}

                            {selectedTab === 'Delivered' && (
                                <TouchableOpacity
                                    onPress={() => Alert.alert('Viết đánh giá', 'Tính năng đánh giá đang được phát triển.')}
                                    style={[styles.detailBtn, { backgroundColor: 'green' }]}
                                >
                                    <Text style={styles.detailBtnText}>Viết đánh giá</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                )}
            </ScrollView>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentEnhanced}>
                        <Text style={styles.modalTitle}>Thông tin Đơn hàng #{selectedOrder?.id}</Text>
                        <View style={styles.separator} />
                        <FlatList
                            data={selectedOrder?.items || []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.itemRow}>
                                    <Text style={styles.itemText}>{item.productName}</Text>
                                    <Text style={styles.itemText}>x{item.quantity}</Text>
                                    <Text style={styles.itemText}>{item.price.toLocaleString()} VND</Text>
                                </View>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.detailBtn}>
                            <Text style={styles.detailBtnText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 15 },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: '#eee',
    },
    activeTab: {
        backgroundColor: '#000',
    },
    tabText: {
        color: '#444',
        fontWeight: 'bold',
    },
    activeTabText: {
        color: '#fff',
    },
    orderCard: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 15,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
    },
    detail: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    empty: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: 30,
        color: '#888',
    },
    detailBtn: {
        marginTop: 10,
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    detailBtnText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContentEnhanced: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    itemText: {
        fontSize: 14,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});
