// ✅ ProductDetailScreen.js (Khớp số sao từ mock + user review)
import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const [mockReviews, setMockReviews] = useState([]);
  const [selectedColor, setSelectedColor] = useState('white');

  const STORAGE_KEY = `reviews_${product.id}`;
  const MOCK_KEY = `mock_reviews_${product.id}`;

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent?.setOptions({ tabBarStyle: { display: 'flex' } });
    };
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      const loadAllReviews = async () => {
        try {
          const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
          if (storedUser) setUserReviews(JSON.parse(storedUser));

          const storedMock = await AsyncStorage.getItem(MOCK_KEY);
          if (storedMock) setMockReviews(JSON.parse(storedMock));
        } catch (e) {
          console.error('Error loading all reviews:', e);
        }
      };
      loadAllReviews();
    }, [])
  );

  const allReviews = [...userReviews, ...mockReviews];
  const averageRating = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1)
    : '0.0';

  const handleAddToCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      const existing = cart.find(
        (item) => item.id === product.id && item.color === selectedColor
      );

      if (existing) {
        cart = cart.map((item) =>
          item.id === product.id && item.color === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        cart.push({ ...product, quantity, color: selectedColor });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View>
          <Image source={product.img} style={styles.image} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Review', { product })}>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#f5a623" />
              <Text style={styles.ratingText}>{averageRating}</Text>
              <Text style={styles.reviewCount}>({allReviews.length} reviews)</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Select Color</Text>
          <View style={styles.colors}>
            {['white', '#888', '#a33'].map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[styles.colorBox, { backgroundColor: color }, selectedColor === color && {
                  borderColor: 'black',
                  borderWidth: 2,
                }]}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            This is a stylish and minimalistic piece of furniture perfect for any modern home.
          </Text>

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
            <TouchableOpacity
              style={styles.bookmarkButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={isFavorite ? 'tomato' : '#333'}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
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
    marginLeft: '10%',
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#888',
    marginTop: 5,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  colors: {
    flexDirection: 'row',
    gap: 10,
  },
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
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: '#777',
    marginLeft: 4,
  },
});
