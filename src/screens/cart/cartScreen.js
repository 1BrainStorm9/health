import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import {plans} from "../../components/fakeData";
import { useNavigation } from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, removeFromCart} from "../../redux/actions/cartActions";


const CartScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const cartList = useSelector(state => state.cart.cartList);

    const getAllProducts = () => {
        const initialCart = [];
        cartList.forEach(item => {
            initialCart.push(item);
        });
        getTotal(initialCart);
        setCart(initialCart);
    }


    useEffect(() => {
        getAllProducts();
    }, [cartList]);

    const getTotal = (cart) => {
        let sum = 0;
        cart.forEach(item => {
            sum += item.count * item.plan.price;
        });
        setTotalPrice(sum);
    };

    const add = (item) => {
        const updatedCart = cart.map(cartItem => {
            if (cartItem.plan.id === item.plan.id) {
                return { ...cartItem, count: cartItem.count + 1 };
            }
            return cartItem;
        });

        const plan = {
            plan: item.plan,
            count: item.count,
        }

        dispatch(addToCart(plan));

        setCart(updatedCart);
        getTotal(updatedCart);
    };

    const remove = (item) => {
        const updatedCart = cart.map(cartItem => {
            if (cartItem.plan.id === item.plan.id) {
                return { ...cartItem, count: cartItem.count - 1 };
            }
            return cartItem;
        });

        const plan = {
            plan: item.plan,
            count: item.count,
        }

        dispatch(removeFromCart(plan));
        setCart(updatedCart);
        getTotal(updatedCart);
    };

    const OrderPressHandler = () => {
        navigation.navigate('OrderScreen', { price: totalPrice });
    };

    const MealPlanItem = ({item}) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.plan.background }} style={styles.backgroundImage} />
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.plan.title}</Text>
                        <Text style={styles.price}>{item.plan.price + " ₽"}</Text>
                    </View>
                    <Text style={styles.info}>{item.plan.calories + " к"} | {item.plan.meals + " приема пищи"}</Text>
                    <View style={styles.footer}>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => remove(item)}>
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantity}>{item.count}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => add(item)}>
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.listContainer}>
                    {cart.map((item) => (
                        <MealPlanItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </View>
            </ScrollView>
            <View style={styles.orderContainer}>
                <Text style={styles.totalPrice}>Общая цена: {totalPrice + " ₽"}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={() => {
                    cart.length > 0
                    ? OrderPressHandler()
                    : null;
                }}>
                    <Text style={styles.orderButtonText}>Заказать</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        overflow: 'hidden',
    },
    backgroundImage: {
        width: '100%',
        height: 150,
    },
    cardContent: {
        padding: 20,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    info: {
        fontSize: 16,
        marginBottom: 15,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00796b',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    orderContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#00796b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    orderButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});



export default CartScreen;
