import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import userStorage from "../../storage/userStorage";
import {useDispatch} from "react-redux";
import {setIsLoggedIn, setUser} from "../../redux/actions/userActions";
import {useNavigation} from "@react-navigation/native";
const LoaderScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const loadData = async () => {
            try {
                const user = await userStorage.getUserLocally();
                if(user){
                    dispatch(setUser(user))
                    dispatch(setIsLoggedIn(true));
                }else {
                    navigation.navigate("AuthScreen")
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadData();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Загрузка...</Text>
        </View>
    );
};

export default LoaderScreen;
