import React, {useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { recipes } from "../../components/fakeData";
import {RecipeCardScreen} from "./recipeCardScreen";
import favoriteStorage from "../../storage/favoriteStorage";
import {setFavoriteFromLocal} from "../../redux/actions/favoriteActions";
import {useDispatch} from "react-redux";
import cartStorage from "../../storage/cartStorage";
import {setCartFromLocal} from "../../redux/actions/cartActions";

const RecipeScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () =>{
            const favorite = await favoriteStorage.loadFavorite();
            const cart = await cartStorage.loadCart();
            if(favorite){
                dispatch(setFavoriteFromLocal(favorite));
                dispatch(setCartFromLocal(cart));
            }
        }
        loadData() 
    }, []);

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchInput} placeholder="Search" />
            <FlatList
                data={recipes}
                renderItem={({ item }) => <RecipeCardScreen item={item} />}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        margin: 16,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    listContent: {
        paddingHorizontal: 8,
    },
});

export default RecipeScreen;
