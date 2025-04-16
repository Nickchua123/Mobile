import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome Icon
import { ThemeContext } from '../contexts/ThemeContext';  // Đảm bảo import đúng ThemeContext

const LoginScreen = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);  // Lấy giá trị theme từ Context
    const [passwordVisible, setPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu
    const [email, setEmail] = useState(''); // Giá trị email
    const [password, setPassword] = useState(''); // Giá trị mật khẩu

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Đổi trạng thái khi nhấn vào mắt
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.container, { backgroundColor: theme === 'Dark' ? '#333' : '#fff' }]}>
                <Text style={[styles.greeting, { color: theme === 'Dark' ? '#fff' : '#000' }]}>Hello !</Text>
                <Text style={[styles.welcomeBack, { color: theme === 'Dark' ? '#ccc' : '#888' }]}>WELCOME BACK</Text>

                <View style={styles.form}>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme === 'Dark' ? '#555' : '#fff', color: theme === 'Dark' ? '#fff' : '#000' }]}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme === 'Dark' ? '#555' : '#fff', color: theme === 'Dark' ? '#fff' : '#000' }]}
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconButton}>
                            <Icon
                                name={passwordVisible ? 'eye' : 'eye-slash'}  // Dùng 'eye' khi hiển thị, 'eye-slash' khi ẩn
                                size={20}
                                color={theme === 'Dark' ? '#fff' : '#000'}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.buttonText}>Log in</Text>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    welcomeBack: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    form: {
        width: '100%',
        marginBottom: 30,
    },
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
    passwordContainer: {
        flexDirection: 'row', // Các phần tử con nằm theo hàng ngang
        alignItems: 'center', // Căn giữa các phần tử theo chiều dọc
    },
    eyeIconButton: {
        position: 'absolute', // Đặt icon mắt vào vị trí tuyệt đối trong TextInput
        right: 15,  // Đưa icon mắt vào bên phải
        top: '40%',  // Căn giữa icon mắt theo chiều dọc
        transform: [{ translateY: -10 }],  // Điều chỉnh vị trí cho icon
    },
    eyeIcon: {
        width: 20,
        height: 20,
    },
    forgotPassword: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        color: '#007BFF',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#333',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    signUpText: {
        color: '#007BFF',
        fontSize: 16,
    },
});

export default LoginScreen;
