import favoriteStorage from "../../storage/favoriteStorage";


const initialState = {
    favoriteList: [],
};

const favoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FAVORITE':
            const addArr = [...state.favoriteList, action.payload]
            favoriteStorage.saveFavorite(addArr).then();
            return {
                ...state,
                favoriteList: addArr
            };
        case 'REMOVE_FAVORITE':
            const removeArr = state.favoriteList.filter(id => id !== action.payload)
            favoriteStorage.saveFavorite(removeArr).then();
            return {
                ...state,
                favoriteList: removeArr,
            };

        case 'SET_FAVORITE_FROM_LOCAL':
            return {
                ...state,
                favoriteList: action.payload,
            };
        default:
            return state;
    }
};

export default favoriteReducer;