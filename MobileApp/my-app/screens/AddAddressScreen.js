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
import addressApi from '../api/addressApi';

export default function AddAddressScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleSaveAddress = async () => {
    if (!name || !phone || !email || !address) {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      await addressApi.add({
        name,
        phone,
        email,
        address,
        isDefault
      });
      Alert.alert('✅ Thành công', 'Đã lưu địa chỉ');
      navigation.goBack();
    } catch (err) {
      Alert.alert('❌ Lỗi', 'Không thể lưu địa chỉ');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thêm địa chỉ mới</Text>

      <TextInput style={styles.input} placeholder="Tên người nhận" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Địa chỉ cụ thể" value={address} onChangeText={setAddress} multiline />

      <TouchableOpacity style={styles.checkbox} onPress={() => setIsDefault(!isDefault)}>
        <View style={[styles.box, isDefault && styles.boxChecked]} />
        <Text style={styles.checkText}>Đặt làm mặc định</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
        <Text style={styles.buttonText}>Lưu</Text>
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
