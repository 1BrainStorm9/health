import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { fakeOrders } from "../../components/fakeData";
import { getOrdersByUserId } from "../../firebase/firebase";
import { useSelector } from "react-redux";

const OrdersListScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);
    const user = useSelector(state => state.user.user.user.uid)

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersData = await getOrdersByUserId(user);
            const formattedOrders = ordersData.map((order, index) => ({
                ...order,
                key: (index + 1).toString()
            }));
            setOrders(formattedOrders);
        };
        fetchOrders();
    }, []);

    const handleOrderPress = (order) => {
        navigation.navigate('OrderInfoScreen', { order });
    };

    return (
        <View style={styles.container}>
            {orders.map((item) => (
                <TouchableOpacity key={item.key} onPress={() => handleOrderPress(item)}>
                    <View style={styles.orderCard}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.orderName}>{"Заказ " + item.key}</Text>
                            <Text style={styles.orderStatus}>Статус: {item.status}</Text>
                        </View>
                        <Text style={styles.orderDeliveryDate}>Дата: {new Date(item.deliveryTime.seconds * 1000).toLocaleDateString()}</Text>

                        <View style={styles.rowContainer}>
                            <View>
                                <Text style={styles.orderDeliveryDate}>Время: {new Date(item.deliveryTime.seconds * 1000).toLocaleTimeString()}</Text>

                            </View>
                            <Text style={styles.orderPrice}>{item.price} ₽</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    orderName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderStatus: {
        fontSize: 16,
    },
    orderDeliveryDate: {
        fontSize: 16,
        marginBottom: 5,
    },
    orderPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrdersListScreen;
