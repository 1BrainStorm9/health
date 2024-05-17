import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {fakeOrders} from "../../components/fakeData";


const OrdersListScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        setOrders(fakeOrders);
    }, []);

    const renderOrderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOrderPress(item)}>
            <View style={styles.orderCard}>
                <View style={styles.rowContainer}>
                    <Text style={styles.orderName}>{item.name}</Text>
                    <Text style={styles.orderStatus}>Статус: {item.status}</Text>
                </View>
                <Text style={styles.orderDeliveryDate}>Дата: {item.deliveryDate}</Text>
                <View style={styles.rowContainer}>
                    <View>
                        <Text style={styles.orderDeliveryDate}>Время: {item.deliveryTime}</Text>
                    </View>
                    <Text style={styles.orderPrice}>{item.totalPrice} ₽</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handleOrderPress = (order) => {
        navigation.navigate('OrderInfoScreen', { order });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 20,
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
