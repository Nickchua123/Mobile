import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/Order';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen'; // THÊM

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Address" component={ShippingAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} /> {/* THÊM */}
    </Stack.Navigator>
  );
}
