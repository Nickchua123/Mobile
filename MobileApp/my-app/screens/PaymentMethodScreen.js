import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentMethodScreen({ navigation }) {
  const [defaultCard, setDefaultCard] = useState('mastercard');

  const handleSetDefault = (cardType) => {
    setDefaultCard(cardType);
  };

  const handleAddCard = () => {
    navigation.navigate('AddCard'); // ✅ Điều hướng đến màn hình thêm thẻ
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Payment method</Text>

      {/* MasterCard */}
      <View style={[styles.card, defaultCard === 'mastercard' && styles.cardActive]}>
        <Ionicons name="card" size={32} color={defaultCard === 'mastercard' ? '#fff' : '#000'} />
        <Text style={[styles.cardNumber, defaultCard === 'mastercard' && { color: '#fff' }]}>
          **** **** **** 3947
        </Text>
        <View style={styles.cardInfo}>
          <Text style={styles.label}>Card Holder Name</Text>
          <Text style={styles.value}>Jennyfer Doe</Text>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.value}>05/23</Text>
        </View>
        <View style={styles.checkboxRow}>
          <Switch
            value={defaultCard === 'mastercard'}
            onValueChange={() => handleSetDefault('mastercard')}
          />
          <Text style={[styles.checkboxLabel, defaultCard === 'mastercard' && { color: '#fff' }]}>
            Use as default payment method
          </Text>
        </View>
      </View>

      {/* Visa */}
      <View style={[styles.card, styles.cardDisabled]}>
        <Ionicons name="card" size={32} color="#000" />
        <Text style={styles.cardNumber}>**** **** **** 3947</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.label}>Card Holder Name</Text>
          <Text style={styles.value}>Jennyfer Doe</Text>
          <Text style={styles.label}>Expiry Date</Text>
          <Text style={styles.value}>05/23</Text>
        </View>
        <View style={styles.checkboxRow}>
          <Switch
            value={defaultCard === 'visa'}
            onValueChange={() => handleSetDefault('visa')}
          />
          <Text style={styles.checkboxLabel}>Use as default payment method</Text>
        </View>
      </View>

      {/* Add new card button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardActive: { backgroundColor: '#000' },
  cardDisabled: { opacity: 0.5 },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardInfo: { marginBottom: 10 },
  label: { fontSize: 12, color: '#999' },
  value: { fontSize: 14, color: '#000', marginBottom: 6 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkboxLabel: { marginLeft: 8, color: '#000' },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
