import {FlatList, StyleSheet, View} from "react-native";
import {recipes} from "../../components/fakeData";

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RecipeCardScreen} from "../recipes/recipeCardScreen";

const FavoriteScreen = () => {
    const favorite = useSelector(state => state.favorite.favoriteList);
    const [recipesArr,setRecipesArr] = useState([])

    useEffect(() => {

        let arr = [];
        favorite.forEach(id => {
            const recipe= recipes.find(recipe => recipe.id === id);
            arr.push(recipe);
        })

        setRecipesArr(arr);
    }, [favorite]);


    return (
        <View style={styles.container}>
            <FlatList
                data={recipesArr}
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
        padding: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default FavoriteScreen;