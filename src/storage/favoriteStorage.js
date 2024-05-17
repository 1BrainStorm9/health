import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    loadFavorite: async () => {
        try {
            const serializedState = await AsyncStorage.getItem('favoriteList');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    },
    saveFavorite: async (state) => {
        try {
            const serializedState = JSON.stringify(state);
            await AsyncStorage.setItem('favoriteList', serializedState);
        } catch (err) {
            console.error('Error saving favorite:', err);
        }
    }
};
