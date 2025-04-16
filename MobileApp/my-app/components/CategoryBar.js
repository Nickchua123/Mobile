import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import categories from '../data/categories';

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
      {categories.map((cat, idx) => {
        const isActive = selectedCategory === cat.name;
        return (
          <TouchableOpacity
            key={idx}
            style={styles.wrapper}
            onPress={() => onSelectCategory(cat.name)}
          >
            <View style={[styles.iconBox, isActive && styles.activeIconBox]}>
              <Ionicons
                name={cat.icon}
                size={20}
                color={isActive ? '#fff' : '#333'}
              />
            </View>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginVertical: 10,
    paddingLeft: 20,
  },
  wrapper: {
    alignItems: 'center',
    marginRight: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeIconBox: {
    backgroundColor: '#000',
  },
  label: {
    fontSize: 12,
    color: '#333',
  },
  activeLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
});
