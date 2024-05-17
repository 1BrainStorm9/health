import { createStackNavigator } from "@react-navigation/stack";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import PlanScreen from "../screens/mealPlan/planScreen";
import PlanInfoScreen from "../screens/mealPlan/planInfoScreen";
import RecipeInfoScreen from "../screens/recipes/recipeInfoScreen";
import {useSelector} from "react-redux";

const Stack = createStackNavigator();

const PlanNavigator = ({route}) => {
    const navigation = useNavigation();
    const planId = useSelector((state) => state.plans.currentPlanId);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PlanScreen"
                component={PlanScreen}
                options={{
                    title: 'Планы питания',
                }}
            />
            <Stack.Screen
                name="PlanInfoScreen"
                component={PlanInfoScreen}
                options={{
                    title: 'Список блюд',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('PlanScreen')}>
                            <Ionicons name="arrow-back" size={24} color="#007bff" />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="RecipeInfoScreen"
                component={RecipeInfoScreen}
                options={{
                    title: 'Рецепт',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("PlanInfoScreen",{planId: planId})
                        }}>
                            <Ionicons name="arrow-back" size={24} color="#007bff" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default PlanNavigator;