import { createStackNavigator } from "@react-navigation/stack";
import recipesScreen from "../screens/recipes/recipesScreen";
import recipeInfoScreen from "../screens/recipes/recipeInfoScreen";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const Stack = createStackNavigator();

const RecipesNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="RecipesScreen"
                component={recipesScreen}
                options={{
                    title: 'Рецепты',
                }}
            />
            <Stack.Screen
                name="RecipeInfoScreen"
                component={recipeInfoScreen}
                options={{
                    title: 'Рецепты',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate("RecipesScreen")}>
                            <Ionicons name="arrow-back" size={24} color="#007bff" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default RecipesNavigator;