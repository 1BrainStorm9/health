import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    getUserLocally: async () => {
        try {
            const serializedState = await AsyncStorage.getItem('user');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },
    setUserLocally: async (state) => {
        try {
            const serializedState = JSON.stringify(state);
            await AsyncStorage.setItem('user', serializedState);
        } catch (err) {
            console.error('Error saving favorite:', err);
        }
    }
};