import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item, navigation }) {
  const imageUrl = item.images?.[0] || 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.img} />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
          <Ionicons name="bag-outline" size={20} color="#555" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    width: '48%',
  },
  imageContainer: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cartButton: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 6,
    elevation: 2,
  },
  name: {
    marginTop: 10,
    fontWeight: '600',
  },
  price: {
    color: '#888',
    marginTop: 5,
    fontWeight: 'bold',
  },
});
