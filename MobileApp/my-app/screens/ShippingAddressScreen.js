import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import addressApi from '../api/addressApi';

export default function ShippingAddressScreen({ route }) {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await addressApi.getAll();
      const all = res.data.data || [];
      setAddresses(all);
      const defaultAddress = all.find(addr => addr.isDefault);
      setSelectedAddressId(defaultAddress?.id || null);
    } catch (err) {
      console.error('Lỗi khi tải địa chỉ:', err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address.id);
    navigation.navigate('Checkout', { selectedAddress: address });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {addresses.length === 0 ? (
          <Text style={styles.empty}>Chưa có địa chỉ nào.</Text>
        ) : (
          addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              onPress={() => handleSelectAddress(address)}
              style={[styles.addressCard, selectedAddressId === address.id && styles.selectedCard]}
            >
              <View style={styles.rowBetween}>
                <Text style={styles.addressName}>{address.name}</Text>
                {selectedAddressId === address.id && (
                  <Ionicons name="checkbox" size={20} color="green" />
                )}
              </View>
              <Text style={styles.addressText}>{address.phone}</Text>
              <Text style={styles.addressText}>{address.email}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
              {address.isDefault && (
                <Text style={styles.defaultLabel}>Mặc định</Text>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress')}
      >
        <Text style={styles.addText}>+ Thêm địa chỉ mới</Text>
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
  scroll: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  addressCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  selectedCard: {
    borderColor: 'green',
    borderWidth: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  defaultLabel: {
    marginTop: 6,
    fontSize: 13,
    color: 'green',
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});
