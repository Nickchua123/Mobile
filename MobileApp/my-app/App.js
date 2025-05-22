import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AddressProvider } from './contexts/AddressContext'; // ✅ THÊM
import PaymentWebview from './screens/PaymentWebview';
import SuccessScreen from './screens/SuccessScreen';
import BottomTabNavigator from './navigation/BottomTabNavigation';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/Signup';
import CheckoutScreen from './screens/CheckoutScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />

    </Stack.Navigator>
  );
}

function AppWrapper() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="PaymentWebview" component={PaymentWebview} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        {/* <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="Address" component={ShippingAddressScreen} /> */}

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AddressProvider>
          <AppWrapper />
        </AddressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
