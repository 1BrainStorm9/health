import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import RecipesNavigator from "./RecipesNavigator";
import CartNavigator from "./CartNavigator";
import PlanNavigator from "./PlanNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return isLoggedIn
        ? (
            <Tab.Navigator initialRouteName="Планы">
                <Tab.Screen
                    name="Планы"
                    component={PlanNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="calendar-today" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Рецепты"
                    component={RecipesNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="restaurant-menu" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Корзина"
                    component={CartNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="shopping-cart" color={color} size={size} />
                        ),
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Tab.Screen
                    name="Профиль"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="person" color={color} size={size} />
                        ),
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        )
        : <AuthNavigator />;
}

export default TabNavigator;
