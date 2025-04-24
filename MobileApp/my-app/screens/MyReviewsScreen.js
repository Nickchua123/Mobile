import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const reviews = [
  {
    id: '1',
    title: 'Coffee Table',
    price: '$ 50.00',
    rating: 5,
    comment:
      'Nice Furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app. Besides, color is also the same and quality is very good despite very cheap price',
    date: '20/03/2020',
    image: require('../assets/products/desk.jpg'),
  },
  // Add more reviews as needed
];

export default function MyReviewsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.productInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.starsRow}>
        {Array(item.rating).fill().map((_, i) => (
          <Ionicons key={i} name="star" size={16} color="#F5A623" style={{ marginRight: 2 }} />
        ))}
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  productInfo: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { color: '#333' },
  date: { fontSize: 12, color: '#888' },
  starsRow: { flexDirection: 'row', marginBottom: 10 },
  comment: { color: '#555', fontSize: 14, lineHeight: 20 },
});
