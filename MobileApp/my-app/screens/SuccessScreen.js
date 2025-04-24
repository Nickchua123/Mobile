import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';

export default function SuccessScreen() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home', params: { screen: 'HomeScreen' } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUCCESS!</Text>
      <Image
        source={require('../assets/image/success.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.message}>
        Your order will be delivered soon.{"\n"}Thank you for choosing our app!
      </Text>

      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => navigation.navigate('Home', { screen: 'Orders' })}
      >
        <Text style={styles.trackText}>Track your orders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={goToHome}>
        <Text style={styles.backText}>BACK TO HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  trackButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 12,
  },
  trackText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  backText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
