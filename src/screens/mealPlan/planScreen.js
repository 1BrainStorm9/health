import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo, otherwise import icons from another library
import { useDispatch } from 'react-redux';
import { setPlanId } from '../../redux/actions/planActions';
import {plans} from "../../components/fakeData";
import {useNavigation} from "@react-navigation/native";
import {addToCart} from "../../redux/actions/cartActions";

const PlanCard = ({ item, onPress, onPressCart }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground source={{ uri: item.background }} style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity onPress={onPressCart} style={styles.cartButton}>
                            <MaterialIcons name="shopping-cart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.price}>{item.price + " ₽"}</Text>
                    <Text style={styles.details}>{item.meals} | {item.calories}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
}

const PlanScreen = () => {
    const dispatch = useDispatch();
    const planNavigation = useNavigation();
    const onPressCardHandler = (planId) => {
        dispatch(setPlanId(planId));
        planNavigation.navigate('PlanInfoScreen', { planId });
    };

    const onPressCartHandler = (id) => {
        const item = {
            planId: id,
            count: 1,
        }
        dispatch(addToCart(item))
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={plans}
                renderItem={({ item }) => (
                    <PlanCard
                        item={item}
                        onPress={() => onPressCardHandler(item.id)}
                        onPressCart={() => onPressCartHandler(item.id)}
                    />
                )}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    card: {
        flex: 1,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        justifyContent: 'center',
    },
    cardContent: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.3)', // Transparent background with gradient
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    price: {
        fontSize: 16,
        color: '#fff',
    },
    details: {
        marginTop: 10,
        fontSize: 14,
        color: '#fff',
    },
    cartButton: {
        padding: 5,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default PlanScreen;
