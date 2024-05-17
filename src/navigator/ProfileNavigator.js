import {createStackNavigator} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import PlanScreen from "../screens/mealPlan/planScreen";
import PlanInfoScreen from "../screens/mealPlan/planInfoScreen";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import ProfileScreen from "../screens/profile/profileScreen";
import FavoriteScreen from "../screens/profile/favoriteScreen";
import OrdersListScreen from "../screens/profile/ordersList";
import OrderInfoScreen from "../screens/profile/orderInfoScreen";


const Stack = createStackNavigator();

const ProfileNavigator = () =>{
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                }}
            />
            <Stack.Screen
                name="OrdersListScreen"
                component={OrdersListScreen}
                options={{
                    title: 'Список заказов',
                }}
            />
            <Stack.Screen
                name="OrderInfoScreen"
                component={OrderInfoScreen}
                options={{
                    title: 'Детали заказа',
                }}
            />
            <Stack.Screen
                name="FavoriteScreen"
                component={FavoriteScreen}
                options={{
                    title: 'Избраное',
                }}
            />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;