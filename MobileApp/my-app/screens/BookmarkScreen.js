import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  NativeEventEmitter,
  NativeModules,
  Alert,
  ToastAndroid,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import useCartCount from '../hooks/useCartCount';

const eventBus = new NativeEventEmitter(NativeModules.UIManager);

export default function FavoriteScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const isFocused = useIsFocused();
  const cartCount = useCartCount();

  useEffect(() => {
    if (isFocused) loadFavorites();
  }, [isFocused]);

  const loadFavorites = async () => {
    const stored = await AsyncStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  };

  const removeFavorite = async (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    ToastAndroid.show('🗑️ Đã xoá khỏi danh sách yêu thích', ToastAndroid.SHORT);
  };

  const addToCart = async (item) => {
    try {
      const stored = await AsyncStorage.getItem('cart');
      let cart = stored ? JSON.parse(stored) : [];

      const existing = cart.find(
        (p) => p.id === item.id && (p.color || 'white') === (item.color || 'white')
      );

      if (existing) {
        cart = cart.map((p) =>
          p.id === item.id && (p.color || 'white') === (item.color || 'white')
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      } else {
        cart.push({ ...item, quantity: 1, color: item.color || 'white' });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      eventBus.emit('cartUpdated');
      ToastAndroid.show('✅ Đã thêm vào giỏ hàng', ToastAndroid.SHORT);
    } catch (e) {
      console.error('Lỗi thêm vào giỏ hàng:', e);
    }
  };

  const handleAddAllToCart = async () => {
    if (favorites.length === 0) return;
    const stored = await AsyncStorage.getItem('cart');
    let cart = stored ? JSON.parse(stored) : [];

    favorites.forEach((fav) => {
      const exists = cart.find(
        (c) => c.id === fav.id && (c.color || 'white') === (fav.color || 'white')
      );
      if (exists) {
        cart = cart.map((c) =>
          c.id === fav.id && (c.color || 'white') === (fav.color || 'white')
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      } else {
        cart.push({ ...fav, quantity: 1, color: fav.color || 'white' });
      }
    });

    await AsyncStorage.setItem('cart', JSON.stringify(cart));
    eventBus.emit('cartUpdated');
    ToastAndroid.show(`✅ Đã thêm ${favorites.length} sản phẩm vào giỏ hàng`, ToastAndroid.SHORT);
  };

  const filteredFavorites = favorites.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={{ uri: item.images?.[0]?.replace('localhost', '10.0.2.2') }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} VND</Text>
      </View>
      <TouchableOpacity onPress={() => removeFavorite(item.id)}>
        <Ionicons name="close" size={22} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addToCart(item)} style={{ marginLeft: 12 }}>
        <Ionicons name="bag-outline" size={22} color="#333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
          <Ionicons
            name={searchVisible ? 'close-outline' : 'search-outline'}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Cart' })} style={{ position: 'relative' }}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {searchVisible && (
        <TextInput
          placeholder="Search favorites..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={styles.searchInput}
        />
      )}

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToCart}>
          <Text style={styles.addAllText}>Add all to my cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 35 },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  searchInput: {
    margin: 20,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  image: { width: 80, height: 80, borderRadius: 12, marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: '500', fontSize: 16 },
  price: { color: '#888', marginTop: 4 },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
    backgroundColor: '#000',
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  addAllButton: { paddingVertical: 14, alignItems: 'center' },
  addAllText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3D00',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
