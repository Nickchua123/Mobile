import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, onToggleSearch, searchVisible }) {
  return (
    <View style={styles.headerContainer}>
      {/* Icon Tìm kiếm */}
      <TouchableOpacity onPress={onToggleSearch}>
        <Ionicons
          name={searchVisible ? 'close-outline' : 'search-outline'}
          size={24}
          color="#555"
        />
      </TouchableOpacity>

      {/* Tiêu đề */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Make home</Text>
        <Text style={styles.subtitle}>BEAUTIFUL</Text>
      </View>

      {/* Icon Cart */}
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        <Ionicons name="cart-outline" size={24} color="#555" />
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
});
