import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useAddress } from '../contexts/AddressContext';

export default function ShippingAddressScreen({ navigation }) {
  const { addresses } = useAddress();

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>
        {addresses.length === 0 ? (
          <Text style={styles.empty}>No address found.</Text>
        ) : (
          addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <Text style={styles.addressName}>{address.name}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
              {address.isDefault && (
                <Text style={styles.defaultText}>Default Address</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress')}
      >
        <Text style={styles.addText}>+ Add New Address</Text>
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
  addressName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressText: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  defaultText: {
    marginTop: 8,
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
