import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import authApi from '../api/authApi'; // Đảm bảo đường dẫn đúng

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignUp = async () => {
    console.log('authApi object:', authApi);
    console.log('authApi.signUp:', authApi.signUp);

    if (!name || !email || !password || !confirm) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (password !== confirm) {
      alert('Mật khẩu không khớp!');
      return;
    }

    try {
      // Gọi API đăng ký
      const response = await authApi.signUp({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });
      console.log("Test:", authApi); // xem có hàm signUp không
      if (response.status === 201) {
        alert('Đăng ký thành công!');
        navigation.navigate('Login');
      } else {
        alert('Đăng ký thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert('Email đã tồn tại!');
      } else {
        alert('Lỗi kết nối máy chủ, vui lòng thử lại.');
      }
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.welcome}>WELCOME</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={18} />
            </TouchableOpacity>
          </View>
          <View style={styles.passwordBox}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirm}
              value={confirm}
              onChangeText={setConfirm}
            />
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Icon name={showConfirm ? 'eye' : 'eye-slash'} size={18} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>
              Already have account? <Text style={{ fontWeight: 'bold' }}>SIGN IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
  },
  form: { width: '100%' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
  },
  passwordBox: {
    position: 'relative',
    justifyContent: 'center',
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  signInText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});
