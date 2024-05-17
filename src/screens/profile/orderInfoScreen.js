import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { plans } from "../../components/fakeData";

const OrderInfoScreen = ({ route }) => {
    const { order } = route.params;

    const products = [];
    order.productsId.forEach(productId => {
        const product = plans.find(plan => plan.id === productId);
        if (product) {
            products.push(product);
        }
    });

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.background }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productCalories}>{item.calories}</Text>
                <Text style={styles.productMeals}>{item.meals}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Название заказа:</Text>
                <Text style={styles.detailValue}>{order.name}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Статус:</Text>
                <Text style={styles.detailValue}>{order.status}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Дата доставки:</Text>
                <Text style={styles.detailValue}>{order.deliveryDate} {order.deliveryTime}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Адрес:</Text>
                <Text style={styles.detailValue}>{order.address}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Комментарий:</Text>
                <Text style={styles.detailValue}>{order.comment}</Text>
            </View>
            <View style={styles.orderDetails}>
                <Text style={styles.detailLabel}>Общая цена:</Text>
                <Text style={styles.detailValue}>{order.totalPrice} ₽</Text>
            </View>
            <Text style={styles.productsTitle}>Товары:</Text>
            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    orderDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailValue: {
        fontSize: 18,
    },
    productsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productList: {
        marginBottom: 20,
    },
    productItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 10,
        overflow: 'hidden',
        maxHeight: 120,
    },
    productImage: {
        width: 100,
        height: 120,
    },
    productDetails: {
        padding: 10,
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productCalories: {
        fontSize: 14,
        marginBottom: 3,
    },
    productMeals: {
        fontSize: 14,
        marginBottom: 3,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'right',
    },
});

export default OrderInfoScreen;
