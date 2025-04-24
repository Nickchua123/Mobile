import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddCardScreen({ navigation }) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Add payment method</Text>

      {/* Card Preview */}
      <View style={styles.cardPreview}>
        <Image
          source={require('../assets/image/card_image.png')}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </View>

      {/* Input fields */}
      <TextInput
        placeholder="CardHolder Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="number-pad"
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <View style={styles.row}>
        <TextInput
          placeholder="CVV"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="number-pad"
          style={[styles.input, styles.halfInput]}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Expiration Date"
          value={expiry}
          onChangeText={setExpiry}
          style={[styles.input, styles.halfInput]}
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Add card button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ADD NEW CARD</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardPreview: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#ddd',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 0.48,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
