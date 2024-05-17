export const setFavorite = (item) => {
    return {
        type: 'SET_FAVORITE',
        payload: item,
    };
};

export const removeFavorite = (id) => ({
    type: 'REMOVE_FAVORITE',
    payload: id
});

export const setFavoriteFromLocal = (cart) => ({
    type: 'SET_FAVORITE_FROM_LOCAL',
    payload: cart,
});
