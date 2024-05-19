import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RecipeCardScreen } from '../recipes/recipeCardScreen';
import { getRecipesData } from '../../firebase/firebase';

const FavoriteScreen = () => {
    const favorite = useSelector(state => state.favorite.favoriteList);
    const [recipesArr, setRecipesArr] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true); // Устанавливаем isLoading в true при начале загрузки
            const recipes = await getRecipesData();
            let arr = [];
            favorite.forEach(id => {
                const data = recipes.find(item => item.id === id);
                if (data) {
                    arr.push(data);
                }
            });
            setRecipesArr(arr);
            setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
        };
        fetchRecipes();
    }, [favorite]);

    return (
        <View style={styles.container}>
            {isLoading ? ( // Отображаем лоадер, если isLoading равно true
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={recipesArr}
                    renderItem={({ item }) => <RecipeCardScreen item={item} />}
                    keyExtractor={item => item.id}
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
        padding: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default FavoriteScreen;
