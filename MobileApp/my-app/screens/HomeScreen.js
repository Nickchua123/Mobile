import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import productApi from '../api/productApi';

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleSearch = () => setSearchVisible(!searchVisible);

  // Load thêm sản phẩm khi cuộn
  const loadProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await productApi.getAll(page, 10);
      const newProducts = res?.data?.data?.data?.result || [];
      const meta = res?.data?.data?.data?.meta || {};

      console.log('🧪 Loaded products:', newProducts);

      setProducts((prev) => [...prev, ...newProducts]);
      setHasMore(page + 1 < meta.pages);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('❌ Lỗi tải sản phẩm:', err);
    } finally {
      setLoading(false);
    }
  };

  // Làm mới danh sách
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await productApi.getAll(0, 10);
      const newProducts = res?.data?.data?.data.result || [];
      const meta = res?.data?.data?.data.meta || {};

      setProducts(newProducts);
      setPage(1);
      setHasMore(1 < meta.pages);
    } catch (err) {
      console.error('Lỗi refresh:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadProducts(); // initial load
  }, []);

  // Load số lượng giỏ hàng khi vào lại màn hình
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

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'Popular' || p.category?.label === selectedCategory;
    const matchKeyword = p.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });
  console.log('📦 Product sample:', products[0]);
  console.log('🔎 Selected category:', selectedCategory);


  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onToggleSearch={toggleSearch}
        searchVisible={searchVisible}
        cartCount={cartCount}
      />
      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

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
        onEndReached={loadProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
        refreshing={refreshing}
        onRefresh={handleRefresh}
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
