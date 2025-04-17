import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import Header from '../components/Header';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

export default function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('Popular');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => setSearchVisible(!searchVisible);

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === 'Popular' || p.category === selectedCategory;
    const matchKeyword = p.name.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        onToggleSearch={toggleSearch}
        searchVisible={searchVisible}
      />
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Chỉ hiện khi searchVisible = true */}
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
        contentContainerStyle={{ paddingHorizontal: 20,paddingBottom: 260, }}
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
