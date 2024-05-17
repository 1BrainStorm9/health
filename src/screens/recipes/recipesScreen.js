import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { RecipeCardScreen } from './recipeCardScreen';
import favoriteStorage from '../../storage/favoriteStorage';
import { setFavoriteFromLocal } from '../../redux/actions/favoriteActions';
import { useDispatch } from 'react-redux';
import cartStorage from '../../storage/cartStorage';
import { setCartFromLocal } from '../../redux/actions/cartActions';
import { getRecipesData } from '../../firebase/firebase';

const RecipeScreen = () => {
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Состояние для отображения лоадера

    useEffect(() => {
        const getData = async () => {
            return await getRecipesData();
        };

        const fetchData = async () => {
            const resp = await getData();
            setRecipes(resp);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <TextInput style={styles.searchInput} placeholder="Search" />
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    renderItem={({ item }) => <RecipeCardScreen item={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.listContent}
                />
            )}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecipeScreen;