// ✅ ReviewScreen.js (Không tạo lại mock review mỗi lần mở)
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const fakeNames = ['Bruno Fernandes', 'Tracy Mosby', 'Anna Lee', 'David Kim', 'Lara Jean'];
const fakeAvatars = [
  require('../assets/users/man.png'),
  require('../assets/users/woman.png'),
  require('../assets/users/boy.png'),
  require('../assets/users/doctor.png'),
  require('../assets/users/profile.png'),
];

function randomDate() {
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateMockReviews(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const name = fakeNames[i % fakeNames.length];
    const avatar = fakeAvatars[i % fakeAvatars.length];
    const rating = Math.floor(Math.random() * 3) + 3;
    const date = randomDate();
    result.push({
      id: i + 1,
      name,
      avatar,
      rating,
      date,
      comment:
        'Nice Furniture with good delivery. The delivery time is very fast. Then products look like exactly the picture in the app...'
    });
  }
  return result;
}

function calculateAverageRating(allReviews) {
  if (allReviews.length === 0) return 0;
  const total = allReviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / allReviews.length).toFixed(1);
}

export default function ReviewScreen({ navigation, route }) {
  const { product } = route.params;
  const [mockReviews, setMockReviews] = useState([]);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userReviews, setUserReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const STORAGE_KEY = `reviews_${product.id}`;
  const MOCK_KEY = `mock_reviews_${product.id}`;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUser) setUserReviews(JSON.parse(storedUser));

        const storedMock = await AsyncStorage.getItem(MOCK_KEY);
        if (storedMock) {
          setMockReviews(JSON.parse(storedMock));
        } else {
          const generated = generateMockReviews(product.reviews);
          setMockReviews(generated);
          await AsyncStorage.setItem(MOCK_KEY, JSON.stringify(generated));
        }
      } catch (e) {
        console.error('Error loading reviews:', e);
      }
    };
    loadReviews();
  }, []);

  const handleSubmitReview = async () => {
    const newReview = {
      id: Date.now(),
      name: newName || 'Anonymous',
      avatar: require('../assets/users/profile.png'),
      rating: newRating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: newComment || 'No comment',
    };
    const updated = [newReview, ...userReviews];
    setUserReviews(updated);
    setNewName('');
    setNewComment('');
    setNewRating(5);
    setShowForm(false);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving review:', e);
    }
  };

  const allReviews = [...userReviews, ...mockReviews];
  const averageRating = calculateAverageRating(allReviews);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Rating & Review</Text>

      <View style={styles.summary}>
        <Image source={product.img} style={styles.productImg} />
        <View>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#f5a623" />
            <Text style={styles.ratingText}>{averageRating}</Text>
            <Text style={styles.reviewCount}> ({allReviews.length} reviews)</Text>
          </View>
        </View>
      </View>

      {showForm && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>Your Review</Text>
          <TextInput
            placeholder="Your name"
            value={newName}
            onChangeText={setNewName}
            style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, marginBottom: 10 }}
          />
          <TextInput
            placeholder="Write your comment..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
            numberOfLines={3}
            style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, marginBottom: 10 }}
          />
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {[1, 2, 3, 4, 5].map((num) => (
              <TouchableOpacity key={num} onPress={() => setNewRating(num)}>
                <Ionicons
                  name={num <= newRating ? 'star' : 'star-outline'}
                  size={24}
                  color="#f5a623"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={{ backgroundColor: '#000', padding: 12, borderRadius: 8, alignItems: 'center' }}
            onPress={handleSubmitReview}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={allReviews}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={item.avatar} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.starRow}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Ionicons key={i} name="star" size={14} color="#f5a623" />
                  ))}
                </View>
              </View>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.reviewButtonText}>{showForm ? 'Cancel' : 'Write a review'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 10,
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 6,
      elevation: 2,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginTop: 50,
    },
    summary: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
      gap: 14,
    },
    productImg: {
      width: 80,
      height: 80,
      borderRadius: 12,
    },
    productName: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
    },
    ratingText: {
      fontWeight: 'bold',
      marginLeft: 4,
    },
    reviewCount: {
      fontSize: 13,
      color: '#777',
      marginLeft: 6,
    },
    reviewCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: 12,
      padding: 14,
      marginBottom: 16,
    },
    reviewHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
      gap: 10,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 20,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 14,
    },
    starRow: {
      flexDirection: 'row',
      marginTop: 4,
    },
    date: {
      fontSize: 12,
      color: '#999',
    },
    comment: {
      fontSize: 14,
      color: '#333',
      marginTop: 6,
      lineHeight: 20,
    },
    reviewButton: {
      position: 'absolute',
      bottom: 30,
      alignSelf: 'center',
      backgroundColor: '#000',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 12,
    },
    reviewButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  