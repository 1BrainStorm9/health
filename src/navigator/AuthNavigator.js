import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/auth/authScreen';
import LoaderScreen from '../screens/auth/loaderScreen';
import registerScreen from "../screens/auth/registerScreen";
import RegisterScreen from "../screens/auth/registerScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="LoaderScreen">
            <Stack.Screen
                name="LoaderScreen"
                component={LoaderScreen}
                options={{
                    headerShown: false,
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={{
                    title: 'Авторизация',
                    headerLeft: null, // Убираем кнопку "назад"
                }}
            />
            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{
                    headerShown: false,
                    headerLeft: null,
                }}
            />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
