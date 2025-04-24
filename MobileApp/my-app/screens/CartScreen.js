import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Lỗi khi load cart từ AsyncStorage:', error);
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Lỗi khi lưu cart:', error);
      }
    };
    saveCart();
  }, [cart]);

  const updateQuantity = (id, color, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.color === color
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.color === color)));
    setSelectedItems(prev => prev.filter(key => key !== `${id}-${color}`));
  };

  const toggleSelect = (id, color) => {
    const key = `${id}-${color}`;
    setSelectedItems(prev =>
      prev.includes(key)
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const isSelected = (id, color) => selectedItems.includes(`${id}-${color}`);

  const toggleSelectAll = () => {
    if (selectedItems.length === cart.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cart.map(item => `${item.id}-${item.color}`));
    }
  };

  const isAllSelected = selectedItems.length === cart.length && cart.length > 0;

  const getTotal = () =>
    cart
      .filter(item => isSelected(item.id, item.color))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleSelect(item.id, item.color)}>
        <Ionicons
          name={isSelected(item.id, item.color) ? 'checkbox' : 'square-outline'}
          size={24}
          color={isSelected(item.id, item.color) ? '#3B82F6' : '#ccc'}
          style={{ marginRight: 8 }}
        />
      </TouchableOpacity>
      <Image source={item.img} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Text style={{ fontSize: 13, color: '#555' }}>Color:</Text>
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: item.color || 'black',
              marginLeft: 6,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          />
        </View>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.color, -1)}>
            <Ionicons name="remove-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{String(item.quantity).padStart(2, '0')}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.color, 1)}>
            <Ionicons name="add-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?', [
            { text: 'Huỷ', style: 'cancel' },
            {
              text: 'Xoá',
              onPress: () => removeItem(item.id, item.color),
              style: 'destructive',
            },
          ])
        }
      >
        <Ionicons name="close-outline" size={22} color="#444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>My cart</Text>

      <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 7,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  }}
>
  <TouchableOpacity onPress={toggleSelectAll} style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons
      name={isAllSelected ? 'checkbox' : 'square-outline'}
      size={24}
      color={isAllSelected ? '#3B82F6' : '#ccc'}
      style={{ marginRight: 8 }}
    />
    <Text style={{ fontWeight: 'bold', color: '#000' }}>Chọn tất cả</Text>
  </TouchableOpacity>
</View>


      <FlatList
        data={cart}
        keyExtractor={(item, index) => `${item.id}-${item.color}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      <View style={styles.promoRow}>
        <TextInput
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder="Enter your promo code"
          style={styles.input}
        />
        <TouchableOpacity style={styles.promoButton}>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const selectedData = cart.filter(item =>
              selectedItems.includes(`${item.id}-${item.color}`)
            );
            if (selectedData.length === 0) {
              Alert.alert('Thông báo', 'Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
              return;
            }
            navigation.navigate('Home', {
              screen: 'Checkout',
              params: { selectedItems: selectedData },
            });
          }}
        >
          <Text style={styles.checkoutText}>Check out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
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
  price: { marginVertical: 6, color: '#888' },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    zIndex: 10,
  },
});
