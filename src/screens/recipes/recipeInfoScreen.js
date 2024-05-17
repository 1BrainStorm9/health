import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { recipes } from "../../components/fakeData";

const RecipeInfoScreen = ({ route }) => {
    const { recipeId } = route.params;
    const neededRecipe = recipes.find(recipe => recipe.id === recipeId);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: neededRecipe.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{neededRecipe.title}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Описание</Text>
                    <Text style={styles.sectionText}>{neededRecipe.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ингредиенты</Text>
                    <Text style={styles.sectionText}>{neededRecipe.ingredients}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Рецепт</Text>
                    <Text style={styles.sectionText}>{neededRecipe.recipe}</Text>
                </View>

                <View style={styles.nutrition}>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionText}>Белки: {neededRecipe.proteins}</Text>
                        <Text style={styles.nutritionText}>Жиры: {neededRecipe.fats}</Text>
                        <Text style={styles.nutritionText}>Углеводы: {neededRecipe.carbs}</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionText}>Калории: {neededRecipe.calories}</Text>
                        <Text style={styles.nutritionText}>Вес: {neededRecipe.weight}</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4c7db2',
    },
    sectionText: {
        fontSize: 16,
        color: '#333',
    },
    nutrition: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    nutritionItem: {
        flex: 1,
    },
    nutritionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
});

export default RecipeInfoScreen;
