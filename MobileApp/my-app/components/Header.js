import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useCartCount from '../hooks/useCartCount'; // 👈 Thêm dòng này

export default function Header({ navigation, onToggleSearch, searchVisible }) {
  const totalItems = useCartCount(); // 👈 Thay useState/useEffect bằng hook này

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onToggleSearch}>
        <Ionicons
          name={searchVisible ? 'close-outline' : 'search-outline'}
          size={24}
          color="#555"
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Make home</Text>
        <Text style={styles.subtitle}>BEAUTIFUL</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ position: 'relative' }}>
        <Ionicons name="cart-outline" size={24} color="#555" />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: '#555',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
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
