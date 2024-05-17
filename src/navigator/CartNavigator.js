import { createStackNavigator } from "@react-navigation/stack";
import {TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import CheckOutScreen from "../screens/cart/checkOutScreen";
import CartScreen from "../screens/cart/cartScreen";

const Stack = createStackNavigator();

const CartNavigator = () => {
    const navigation = useNavigation();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CartScreen"
                component={CartScreen}
                options={{
                    title: 'Корзина',
                }}
            />
            <Stack.Screen
                name="OrderScreen"
                component={CheckOutScreen}
                options={{
                    title: 'Заказ',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                            <Ionicons name="arrow-back" size={24} color="#007bff" />
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default CartNavigator;