import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Button, Platform } from 'react-native';
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {fakeOrders} from "../../components/fakeData";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {resetCart} from "../../redux/actions/cartActions";
import { ToastAndroid } from 'react-native';
const CheckOutScreen = ({ route }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const formattedDate = selectedDate.toLocaleDateString(); // Example formatting
    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    const minimalDate = new Date();
    const maxTime = new Date();
    const cartList = useSelector(state => state.cart.cartList);
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const totalPrice = route.params.price;
    const maximumDate = new Date();
    maximumDate.setDate(maximumDate.getDate() + 3);
    minimalDate.setHours(9, 0, 0);
    if (new Date().getHours() >= 21) {
        minimalDate.setDate(minimalDate.getDate() + 1);
    }
    maxTime.setHours(22, 0, 0);




    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: currentMode === "date" ? selectedDate : selectedTime,
            mode: currentMode,
            onChange,
            is24Hour: true,
            minimumDate: currentMode === "date" ? minimalDate : minimalDate,
            maximumDate: currentMode === "date" ? maximumDate : maxTime,
            display: currentMode === "time" ? "spinner" : "default",
        })

    };

    const onChange = (event, selectedDate) => {
        if (event.type === "dismissed" || event.type === "neutralButtonPressed"){
            return;
        }

        setSelectedDate(selectedDate);
        setSelectedTime(selectedDate);
    };

    const showDatePicker = () => {
        showMode("date");
    };

    const showTimePicker = () => {
        showMode("time");
    };

    const submitOrder = () => {
        if (!address) {
            alert('Пожалуйста, введите адрес');
            return;
        }
        let arr= [];
        cartList.forEach(item => {
            arr.push(item.plan.id);
        })

        const deliveryDate = `${selectedDate.getDate()}.${selectedDate.getMonth() + 1}.${selectedDate.getFullYear()}`;
        const hours = selectedDate.getHours().toString().padStart(2, '0');
        const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
        const deliveryTime = `${hours}:${minutes}`;

        const item = {
            id: fakeOrders.length + 1,
            name: 'Заказ #' + (fakeOrders.length + 1),
            totalPrice: totalPrice,
            status: 'В процессе',
            deliveryDate: deliveryDate,
            deliveryTime: deliveryTime,
            productsId: arr,
            address: address,
            comment: comment,
        };


        fakeOrders.push(item);
        dispatch(resetCart());
        ToastAndroid.show('Заказ оформлен!', ToastAndroid.SHORT);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Планы' }],
        });

    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.label}>Выберите дату и время:</Text>
                <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
                    <Text style={styles.dateButtonText}>{formattedDate || 'Выбрать дату и время'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateButton} onPress={showTimePicker}>
                    <Text style={styles.dateButtonText}>{formattedTime || 'Выбрать время'}</Text>
                </TouchableOpacity>
            </View>

            {/* Поле для адреса */}
            <View style={styles.addressContainer}>
                <Text style={styles.label}>Адрес доставки:</Text>
                <TextInput
                    style={styles.addressInput}
                    placeholder="Введите ваш адрес"
                    value={address}
                    onChangeText={setAddress}
                    required
                />
            </View>

            {/* Поле для комментария */}
            <View style={styles.commentContainer}>
                <Text style={styles.label}>Комментарий к заказу:</Text>
                <TextInput
                    style={styles.commentInput}
                    placeholder="Введите ваш комментарий"
                    value={comment}
                    onChangeText={setComment}
                    multiline={true}
                />
            </View>

            {/* Кнопка заказа */}
            <View style={styles.orderContainer}>
                <Text style={styles.totalPrice}>Общая цена: {totalPrice + " ₽"}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={submitOrder}>
                    <Text style={styles.orderButtonText}>Заказать</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    timeContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    addressContainer: {
        marginBottom: 20,
    },
    commentContainer: {
        marginBottom: 20,
    },
    addressInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
        height: 100,
        textAlignVertical: 'top',
    },
    orderContainer: {
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
    dateButton: {
        backgroundColor: '#00796b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    dateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CheckOutScreen;
