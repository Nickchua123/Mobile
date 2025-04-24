import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { login } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: theme === 'Dark' ? '#333' : '#fff' }]}>
        <Text style={[styles.greeting, { color: theme === 'Dark' ? '#fff' : '#000' }]}>Hello !</Text>
        <Text style={[styles.welcomeBack, { color: theme === 'Dark' ? '#ccc' : '#888' }]}>WELCOME BACK</Text>

        <View style={styles.form}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme === 'Dark' ? '#555' : '#fff',
                color: theme === 'Dark' ? '#fff' : '#000',
              },
            ]}
            placeholder="Email"
            placeholderTextColor={theme === 'Dark' ? '#ccc' : '#aaa'}
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme === 'Dark' ? '#555' : '#fff',
                  color: theme === 'Dark' ? '#fff' : '#000',
                },
              ]}
              placeholder="Password"
              placeholderTextColor={theme === 'Dark' ? '#ccc' : '#aaa'}
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconButton}>
              <Icon
                name={passwordVisible ? 'eye' : 'eye-slash'}
                size={20}
                color={theme === 'Dark' ? '#fff' : '#000'}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>
              Don't have an account? <Text style={{ fontWeight: 'bold' }}>SIGN UP</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={toggleTheme}>
            <Text style={styles.signUpText}>
              {theme === 'Dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  greeting: { fontSize: 30, fontWeight: 'bold', marginBottom: 10 },
  welcomeBack: { fontSize: 20, fontWeight: 'bold', marginBottom: 30 },
  form: { width: '100%', marginBottom: 30 },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    width: '100%',
  },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  eyeIconButton: {
    position: 'absolute',
    right: 15,
    top: '40%',
    transform: [{ translateY: -10 }],
  },
  eyeIcon: { width: 20, height: 20 },
  forgotPassword: { marginTop: 10, marginBottom: 20, alignItems: 'flex-end' },
  forgotPasswordText: { color: '#007BFF', fontSize: 14 },
  loginButton: {
    backgroundColor: '#333',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signUpButton: { marginTop: 20, alignItems: 'center' },
  signUpText: { color: '#007BFF', fontSize: 16 },
});

export default LoginScreen;
