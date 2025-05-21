import React, { useState, useLayoutEffect } from 'react';
import cartApi from '../api/cartApi';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import productApi from '../api/productApi';

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState('white');

  const FAVORITE_KEY = 'favorites';

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const loadProduct = async () => {
        try {
          const res = await productApi.getById(productId);
          const data = res?.data?.data || res?.data;

          setProduct(data);

          const storedFav = await AsyncStorage.getItem(FAVORITE_KEY);
          const favList = storedFav ? JSON.parse(storedFav) : [];
          const isFav = favList.some((p) => p.id === data.id);
          setIsFavorite(isFav);
        } catch (e) {
          console.error('❌ Lỗi khi load sản phẩm:', e);
        }
      };

      loadProduct();
    }, [productId])
  );

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đang tải chi tiết sản phẩm...</Text>
      </View>
    );
  }

  const imageUrl = product.images?.[0]?.replace('localhost', '10.0.2.2');

  console.log("Anh la: ", imageUrl);

  const handleAddToCart = async () => {
    try {
      const body = {
        productId: product.id,
        quantity,
      };

      await cartApi.addToCart(body); // ✅ Gửi lên BE

      Alert.alert('🛒 Thành công', 'Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('❌ Lỗi khi thêm vào giỏ hàng:', error);
      Alert.alert('Lỗi', 'Không thể thêm vào giỏ hàng.');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITE_KEY);
      let favorites = stored ? JSON.parse(stored) : [];

      if (isFavorite) {
        favorites = favorites.filter((p) => p.id !== product.id);
        setIsFavorite(false);
      } else {
        favorites.push({ ...product, color: selectedColor });
        setIsFavorite(true);
      }

      await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Lỗi khi toggle favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{product.price.toLocaleString()} đ</Text>

          <Text style={styles.sectionTitle}>Chọn màu</Text>
          <View style={styles.colors}>
            {['white', '#888', '#a33'].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorBox,
                  { backgroundColor: color },
                  selectedColor === color && {
                    borderColor: 'black',
                    borderWidth: 2,
                  },
                ]}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.description}>{product.description || 'Không có mô tả.'}</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
              <Ionicons name="remove-circle-outline" size={30} />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={() => quantity < 10 && setQuantity(quantity + 1)}>
              <Ionicons name="add-circle-outline" size={30} />
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <TouchableOpacity style={styles.bookmarkButton} onPress={handleToggleFavorite}>
              <Ionicons
                name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isFavorite ? 'tomato' : '#333'}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 400,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  price: { fontSize: 18, color: '#888', marginTop: 5 },
  sectionTitle: { fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
  colors: { flexDirection: 'row', gap: 10 },
  colorBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  description: {
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 20,
  },
  quantity: { fontSize: 18, fontWeight: 'bold' },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 30,
  },
  bookmarkButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 12,
  },
  addButton: {
    flex: 1,
    backgroundColor: 'black',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
