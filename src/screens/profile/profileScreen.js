import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import { setIsLoggedIn } from "../../redux/actions/userActions";
import { useNavigation } from "@react-navigation/native";
import userStorage from "../../storage/userStorage";
import {
    addOrder,
    getCollectionData,
    getOrdersByUserId,
    getPlansData,
    getRecipesData,
    login, logout
} from "../../firebase/firebase";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email,setEmail] = useState("");
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if(user){
            setEmail(user._tokenResponse.email);
        }
    }, [user]);

    const onPressExitHandler = async () => {
        await userStorage.setUserLocally(null);
        await logout()
        dispatch(setIsLoggedIn(false));
    }

    const onPressFavoriteHandler = () => {
        navigation.navigate("FavoriteScreen")
    }

    const onPressOrdersHandler = async () => {
        navigation.navigate("OrdersListScreen")
    }

    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <View style={styles.profileInfo}>
                    <Image
                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/711/711769.png" }}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                    <Text style={styles.username}>{email}</Text>
                </View>

                <TouchableOpacity onPress={onPressFavoriteHandler}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Избранные блюда</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressOrdersHandler}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Список заказов</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onPressExitHandler}>
                    <View style={[styles.menuItem, styles.exitButton]}>
                        <Text style={[styles.menuItemText, styles.exitButtonText]}>Выйти из аккаунта</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#000',
        paddingVertical: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    menuItem: {
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItemText: {
        fontSize: 18,
        color: '#000',
    },
    exitButton: {
        backgroundColor: '#000',
    },
    exitButtonText: {
        color: '#fff',
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default ProfileScreen;
