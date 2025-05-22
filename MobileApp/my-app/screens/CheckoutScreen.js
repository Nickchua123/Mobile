import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { EvilIcons } from '@expo/vector-icons';
import { useAddress } from '../contexts/AddressContext';
import shippingOptions from '../data/shippingOptions.json';
import orderApi from '../api/orderApi';

export default function CheckoutScreen({ route }) {
  const { addresses } = useAddress();
  const [cart, setCart] = useState([]);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isPaymentOnDelivery, setIsPaymentOnDelivery] = useState(false);
  const [isPaymentByCard, setIsPaymentByCard] = useState(false);
  const navigation = useNavigation();

  const selectedItems = route?.params?.selectedItems || [];

  useEffect(() => {
    if (selectedItems.length > 0) {
      setCart(selectedItems);
      const total = selectedItems.reduce(
        (sum, item) => sum + Number(item?.product?.price || 0) * (item.quantity || 1),
        0
      );
      setTotalPrice(total);
    }
  }, [selectedItems]);

  useEffect(() => {
    const defaultAddress = addresses.find((address) => address.isDefault === true);
    setCurrentAddress(defaultAddress);
  }, [addresses]);

  const handleBackPress = () => navigation.goBack();

  const handlePaymentMethodChange = (type) => {
    if (type === 'card') {
      setIsPaymentByCard(!isPaymentByCard);
      if (!isPaymentByCard) setIsPaymentOnDelivery(false);
    } else {
      setIsPaymentOnDelivery(!isPaymentOnDelivery);
      if (!isPaymentOnDelivery) setIsPaymentByCard(false);
    }
  };

  const handleOrder = async () => {
    if (!currentAddress) return alert('Vui lòng chọn địa chỉ giao hàng!');
    if (!selectedShipping) return alert('Vui lòng chọn phương thức vận chuyển!');
    if (!isPaymentByCard && !isPaymentOnDelivery) return alert('Vui lòng chọn phương thức thanh toán!');

    try {
      const payload = {
        items: cart.map(item => ({
          productId: item.product?.id || item.id,
          quantity: item.quantity || 1
        })),
        addressId: currentAddress.id,
        shippingId: selectedShipping.id,
        paymentMethod: isPaymentByCard ? 'CARD' : 'COD'
      };

      const res = await orderApi.createOrder(payload);

      if (res.data.redirectUrl) {
        navigation.navigate('PaymentWebview', { url: res.data.redirectUrl });
      } else {
        navigation.navigate('Success');
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      alert('Đặt hàng thất bại!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.header}>Thanh toán</Text>

        <View style={styles.section}>
          <View style={styles.touchable}>
            <Text style={styles.sectionHeader}>Địa chỉ giao hàng</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { screen: 'Address' })}
              style={styles.editIcon}
            >
              <EvilIcons name="pencil" size={30} color="#888" />
            </TouchableOpacity>
          </View>
          {currentAddress ? (
            <>
              <Text style={styles.textAddressName}>{currentAddress.name}</Text>
              <Text style={styles.textAddress}>{currentAddress.address}</Text>
            </>
          ) : (
            <Text>Đang tải địa chỉ...</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Giỏ hàng của bạn</Text>
          {cart.length > 0 ? (
            cart.map((item, index) => {
              const product = item?.product || {};
              const price = Number(product.price || 0);
              const imageUrl = product.images?.[0]?.replace('localhost', '10.0.2.2');

              return (
                <View style={styles.cartItem} key={`${item.id}-${index}`}>
                  <Image
                    source={{ uri: imageUrl || 'https://via.placeholder.com/100' }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{product.name || 'Không có tên sản phẩm'}</Text>
                    <Text style={styles.itemPrice}>{price.toLocaleString()} VND</Text>
                    <Text style={styles.itemQuantity}>Số lượng: {item.quantity || 1}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text>Giỏ hàng của bạn hiện tại đang trống.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Phương thức thanh toán</Text>
          <View style={styles.paymentCard}>
            <TouchableOpacity onPress={() => handlePaymentMethodChange('card')}>
              <Ionicons
                name={isPaymentByCard ? 'checkbox' : 'square-outline'}
                size={24}
                color={isPaymentByCard ? '#3B82F6' : '#ccc'}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <Image source={require('../assets/image/mastercard.jpg')} style={styles.Paymentimg} />
            <Text style={styles.cardInfo}>Thẻ quốc tế</Text>
          </View>
          <View style={styles.paymentCard}>
            <TouchableOpacity onPress={() => handlePaymentMethodChange('delivery')}>
              <Ionicons
                name={isPaymentOnDelivery ? 'checkbox' : 'square-outline'}
                size={24}
                color={isPaymentOnDelivery ? '#3B82F6' : '#ccc'}
                style={{ marginRight: 12 }}
              />
            </TouchableOpacity>
            <FontAwesome name="money" size={24} color="green" />
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>
              Thanh toán khi nhận hàng
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Phương thức vận chuyển</Text>
          {shippingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.shippingOption,
                selectedShipping?.id === option.id && styles.selectedShipping,
                { flexDirection: 'row', alignItems: 'center' }
              ]}
              onPress={() => setSelectedShipping(selectedShipping?.id === option.id ? null : option)}
            >
              <Ionicons
                name={selectedShipping?.id === option.id ? 'checkbox' : 'square-outline'}
                size={24}
                color={selectedShipping?.id === option.id ? '#3B82F6' : '#ccc'}
                style={{ marginRight: 12 }}
              />
              <Text style={{ fontSize: 16 }}>{`${option.label} (${option.fee === 0 ? 'Miễn phí' : `${option.fee.toLocaleString()} VND`})`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.priceLabel}>Đơn hàng: {Number(totalPrice || 0).toLocaleString()} VND</Text>
          <Text style={styles.priceLabel}>
            Phí vận chuyển: {Number(selectedShipping?.fee || 0).toLocaleString()} VND
          </Text>
          <Text style={styles.totalAmount}>
            Tổng cộng: {Number(totalPrice + (selectedShipping?.fee || 0)).toLocaleString()} VND
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleOrder}>
        <Text style={styles.submitText}>ĐẶT HÀNG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: {
    position: 'absolute', top: 40, left: 20,
    backgroundColor: '#fff', borderRadius: 20, padding: 6, elevation: 3, zIndex: 10,
  },
  scrollContainer: { marginTop: 25 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  touchable: { flexDirection: 'row', justifyContent: 'space-between' },
  section: { marginBottom: 20, borderWidth: 0.2, borderRadius: 20, padding: 10 },
  itemImage: { width: 80, height: 80, borderRadius: 10, marginRight: 12, marginBottom: 10 },
  itemDetails: { flex: 1, justifyContent: 'center', paddingLeft: 10 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#000', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#888', marginBottom: 4 },
  itemQuantity: { fontSize: 14, color: '#555' },
  cartItem: { flexDirection: 'row' },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 5, color: '#909090' },
  paymentCard: {
    flexDirection: 'row', padding: 15, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center'
  },
  Paymentimg: { width: 50, height: 50, marginRight: 15 },
  cardInfo: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  textAddressName: { fontWeight: 'bold', fontSize: 18, paddingBottom: 10 },
  textAddress: { fontSize: 14, color: '#888' },
  shippingOption: {
    marginBottom: 10, padding: 10, borderRadius: 10, backgroundColor: '#f5f5f5',
  },
  selectedShipping: {
    backgroundColor: '#e0f7ff', borderWidth: 1, borderColor: '#2196F3',
  },
  priceLabel: { fontSize: 16, color: '#333', marginBottom: 8, fontWeight: '500' },
  totalAmount: { fontSize: 16, color: '#000', fontWeight: 'bold', marginTop: 6 },
  submitButton: {
    backgroundColor: '#242424', paddingVertical: 15, borderRadius: 10, marginTop: 20, alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
