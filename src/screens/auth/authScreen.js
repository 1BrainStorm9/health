import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const onPressHandler = async () => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        try {
            const response = await fetch('http://192.168.31.26/unprotected-route');
            console.log(response)

            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }

            const data = await response.json();
            //const { access_token } = data;

            // Сохранение токена
            //await AsyncStorage.setItem('token', access_token);
            // Установка состояния пользователя в Redux
            //dispatch(setIsLoggedIn(true));
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Ошибка входа. Проверьте ваши данные.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Вход</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Почта"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={onPressHandler}>
                <Text style={styles.buttonText}>Войти</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Забыл пароль</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.footerText}>Регистрация</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    footerText: {
        color: '#007bff',
    },
});

export default LoginScreen;
