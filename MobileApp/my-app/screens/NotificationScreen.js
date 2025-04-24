// screens/NotificationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Your order has been shipped!',
      description: 'Order #1234 is on its way to you.',
      type: 'order',
    },
    {
      id: '2',
      title: 'New Promo: 20% OFF',
      description: 'Don’t miss out on our spring sale!',
      type: 'promo',
    },
    {
      id: '3',
      title: 'App Update Available',
      description: 'A new version of the app is now available.',
      type: 'system',
    },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Ionicons
        name={
          item.type === 'order'
            ? 'cart-outline'
            : item.type === 'promo'
            ? 'pricetag-outline'
            : 'information-circle-outline'
        }
        size={24}
        color="#000"
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={80} color="#000" />
          <Text style={styles.emptyText}>You have no new notifications</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Go back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
