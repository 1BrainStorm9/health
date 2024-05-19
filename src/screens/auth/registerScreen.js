import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import {setIsLoggedIn, setUser} from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from "../../firebase/firebase";
import {useNavigation} from "@react-navigation/native";
import userStorage from "../../storage/userStorage";


const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const onPressHandler = async () => {

        const user = await create(email, password);
        await userStorage.setUserLocally(user);
        dispatch(setUser(user));
        dispatch(setIsLoggedIn(true));
    };

    const onPressSignIn = async () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Регистрация</Text>
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
                <Text style={styles.buttonText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <TouchableOpacity onPress={onPressSignIn}>
                    <Text style={styles.footerText}>Уже есть аккаунт? Войти</Text>
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
        justifyContent: 'center',
        width: '100%',
    },
    footerText: {
        color: '#007bff',
    },
});

export default RegisterScreen;
