import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAddress } from '../contexts/AddressContext';

export default function AddAddressScreen() {
  const navigation = useNavigation();
  const { addAddress } = useAddress();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSaveAddress = () => {
    if (name === '' || address === '') {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newAddress = {
      id: Math.random().toString(36).substring(7),
      name,
      address,
      isDefault,
    };

    addAddress(newAddress); 
    navigation.goBack();    // Quay lại màn trước
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setIsDefault(!isDefault)}
      >
        <View style={[styles.box, isDefault && styles.boxChecked]} />
        <Text style={styles.checkText}>Set as default address</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  boxChecked: {
    backgroundColor: '#000',
  },
  checkText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
