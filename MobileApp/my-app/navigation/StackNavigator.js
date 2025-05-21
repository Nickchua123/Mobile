import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/Order';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MyReviewsScreen from '../screens/MyReviewsScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import AddCardScreen from '../screens/AddCardScreen';
import LoginScreen from '../screens/Login';
import SignUpScreen from '../screens/Signup';
import HomeScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="ProfileMain">
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="Address" component={ShippingAddressScreen} />
      <Stack.Screen name="AddAddress" component={AddAddressScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}

    </Stack.Navigator>

  );
}
