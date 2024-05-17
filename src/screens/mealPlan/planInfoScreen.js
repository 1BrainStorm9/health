import {FlatList, StyleSheet, TextInput, View} from "react-native";
import {plans, recipes} from "../../components/fakeData";
import {useEffect, useState} from "react";
import {RecipeCardScreen} from "../recipes/recipeCardScreen";

const PlanInfoScreen = ({ route }) =>{
    const { planId } = route.params;
    const [recipesArr,setRecipesArr] = useState([])

    useEffect(() => {
        let arr = [];
        const plan= plans.find(plan => plan.id === planId);

        plan.recipesId.forEach(id => {
           const recipe= recipes.find(recipe => recipe.id === id);
           arr.push(recipe);
        })

        setRecipesArr(arr);
    }, []);


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
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default PlanInfoScreen;