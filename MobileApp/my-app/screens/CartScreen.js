import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, TextInput, Alert, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import cartApi from '../api/cartApi';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartApi.getMyCart();
        setCart(response.data.data);
        setSelectedItems([]);
      } catch (error) {
        console.error('Lỗi lấy giỏ hàng:', error);
      }
    };

    fetchCart();
  }, []);

  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map((item) => item.id));
    }
  };

  const isSelected = (id) => selectedItems.includes(id);
  const isAllSelected = selectedItems.length === cart.length && cart.length > 0;

  const getTotal = () =>
    cart
      .filter((item) => isSelected(item.id))
      .reduce((sum, item) => {
        const price = Number(item?.product?.price || 0);
        const qty = Number(item?.quantity || 0);
        return sum + price * qty;
      }, 0);


  const renderItem = ({ item }) => {
    const imageUrl = item.product.images?.[0]?.replace('localhost', '10.0.2.2');

    const handleRemoveItem = () => {
      Alert.alert('Xác nhận', 'Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng?', [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          onPress: async () => {
            try {
              await cartApi.deleteCartItem(item.product.id);
              setCart((prev) => prev.filter((i) => i.id !== item.id));
              setSelectedItems((prev) => prev.filter((id) => id !== item.id));
            } catch (error) {
              console.error('Lỗi khi xoá item:', error);
            }
          },
          style: 'destructive',
        },
      ]);
    };

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => toggleSelect(item.id)}>
          <Ionicons
            name={isSelected(item.id) ? 'checkbox' : 'square-outline'}
            size={24}
            color={isSelected(item.id) ? '#3B82F6' : '#ccc'}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>

        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.name}>{item.product.name}</Text>
          <Text style={styles.price}>{item.product.price.toLocaleString()} VND</Text>
          <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
        </View>

        <TouchableOpacity onPress={handleRemoveItem}>
          <Ionicons name="close-outline" size={22} color="#444" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng của bạn</Text>

      <View style={styles.selectAllRow}>
        <TouchableOpacity onPress={toggleSelectAll} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={isAllSelected ? 'checkbox' : 'square-outline'}
            size={24}
            color={isAllSelected ? '#3B82F6' : '#ccc'}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.selectAllText}>Chọn tất cả</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có sản phẩm nào.</Text>}
      />

      <View style={styles.promoRow}>
        <TextInput
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder="Mã giảm giá"
          style={styles.input}
        />
        <TouchableOpacity style={styles.promoButton}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Tổng: {getTotal().toLocaleString()} VND</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const selectedData = cart.filter((item) => isSelected(item.id));
            if (selectedData.length === 0) {
              Alert.alert('Thông báo', 'Bạn chưa chọn sản phẩm nào để thanh toán.');
              return;
            }
            navigation.navigate('Checkout', { selectedItems: selectedData });
          }}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginTop: 40, marginBottom: 10 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    padding: 10,
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  name: { fontWeight: '600', fontSize: 16 },
  price: { marginVertical: 4, color: '#888' },
  quantity: { color: '#555', fontSize: 14 },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  selectAllText: { fontWeight: 'bold', color: '#000' },
  promoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  promoButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    marginLeft: 8,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
