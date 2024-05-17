import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    loadCart: async () => {
        try {
            const serializedState = await AsyncStorage.getItem('cartList');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },
    saveCart: async (state) => {
        try {
            const serializedState = JSON.stringify(state);
            await AsyncStorage.setItem('cartList', serializedState);
        } catch (err) {
            console.error('Error saving favorite:', err);
        }
    }
};
