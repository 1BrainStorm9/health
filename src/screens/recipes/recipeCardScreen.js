import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { setFavorite, removeFavorite } from "../../redux/actions/favoriteActions";
import {getRecipesData} from "../../firebase/firebase";

export const RecipeCardScreen = ({ item }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const favorite = useSelector(state => state.favorite.favoriteList);
    const isFavorite = favorite.includes(item.id);


    const handlePress = () => {
        navigation.navigate('RecipeInfoScreen', { recipe: item});
    };

    const onPressFavoriteHandle = (id) => {
        if (isFavorite) {
            dispatch(removeFavorite(id));
        } else {
            dispatch(setFavorite(id));
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <TouchableOpacity style={styles.favoriteButton} onPress={() => onPressFavoriteHandle(item.id)}>
                    <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.ingredients} numberOfLines={2}>{item.ingredients}</Text>
                <Text style={styles.cardDetails}>{item.calories + " к"} | {item.weight + " г"}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "46%",
        backgroundColor: '#fff',
        borderRadius: 8,
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    favoriteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ingredients: {
        marginTop: 5,
        color: 'gray',
    },
    cardDetails: {
        marginTop: 10,
        color: 'gray',
    },
    cardContent: {
        padding: 16,
    },
});
