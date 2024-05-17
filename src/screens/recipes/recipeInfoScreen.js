import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { recipes } from "../../components/fakeData";

const RecipeInfoScreen = ({ route }) => {
    const { recipe } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: recipe?.imageUrl }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>{recipe?.title}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Описание</Text>
                    <Text style={styles.sectionText}>{recipe?.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ингредиенты</Text>
                    <Text style={styles.sectionText}>{recipe?.ingredients}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Рецепт</Text>
                    <Text style={styles.sectionText}>{recipe?.recipeText}</Text>
                </View>

                <View style={styles.nutrition}>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionText}>Белки: {recipe?.nutritionalValue?.proteins + " г"}</Text>
                        <Text style={styles.nutritionText}>Жиры: {recipe?.nutritionalValue?.fats + " г"}</Text>
                        <Text style={styles.nutritionText}>Углеводы: {recipe?.nutritionalValue?.carbs + " г"}</Text>
                    </View>
                    <View style={styles.nutritionItem}>
                        <Text style={styles.nutritionText}>Калории: {recipe?.calories}</Text>
                        <Text style={styles.nutritionText}>Вес: {recipe?.weight + " г"}</Text>
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
