import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleSearch = () => setSearchVisible(!searchVisible);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'Popular' || p.category === selectedCategory;
    const matchKeyword = p.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  useFocusEffect(
    useCallback(() => {
      const loadCartCount = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          if (storedCart) {
            const cartItems = JSON.parse(storedCart);
            const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(total);
          } else {
            setCartCount(0);
          }
        } catch (error) {
          console.error('Lỗi khi lấy giỏ hàng:', error);
        }
      };

      loadCartCount();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onToggleSearch={toggleSearch}
        searchVisible={searchVisible}
        cartCount={cartCount} // Truyền số lượng sản phẩm sang Header
      />
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {searchVisible && (
        <TextInput
          placeholder="Search product..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={styles.searchInput}
        />
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 260 }}
        renderItem={({ item }) => (
          <ProductCard item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  searchInput: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
});
