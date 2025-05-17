import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../contexts/ThemeContext';
import authApi from '../api/authApi'; // Kết nối API
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const role = "USER";
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    console.log("Đang gửi lên:", {
      username: email.trim(), // ✅ đúng field
      password,
      role: "USER"
    });

    if (!email || !password) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ Email và Mật khẩu');
      return;
    }

    try {
      setLoading(true);
      const response = await authApi.login({
        username: email.trim(),
        password,
        role
      });
      const { accessToken } = response.data.data.accessToken;
      await login(accessToken); // Lưu token vào context
      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
      Alert.alert('Thành công', 'Đăng nhập thành công!');
      // Chuyển hướng hoặc gọi useAuth().login() nếu có context
      navigation.navigate('HomeScreen'); // Navigate sang trang chủ 
    } catch (error) {
      if (error.response?.status === 401) {
        Alert.alert('Lỗi', 'Tài khoản hoặc mật khẩu không đúng.');
      } else {
        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ.');
      }
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            keyboardType="email-address"
            autoCapitalize="none"
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Log in'}</Text>
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
