import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/products/intro.png')} // ảnh bạn đã đặt
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <Text style={styles.heading}>MAKE YOUR</Text>
        <Text style={styles.title}>HOME BEAUTIFUL</Text>
        <Text style={styles.subtitle}>
          The best simple place where you{'\n'}discover most wonderful furnitures{'\n'}and make your home beautiful
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('MainTabs')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 300,
    paddingHorizontal: 30,
  },
  heading: {
    fontSize: 14,
    letterSpacing: 1.5,
    color: '#333',
    fontWeight: '600',
    marginBottom: 12,
    
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 32,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
