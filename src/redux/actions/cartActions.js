export const addToCart = (item) => {
    return {
        type: 'ADD_TO_CART',
        payload: item,
    };
};

export const removeFromCart = (id) => ({
    type: 'REMOVE_FROM_CART',
    payload: id
});

export const setCartFromLocal = (cart) => ({
    type: 'SET_CART_FROM_LOCAL',
    payload: cart,
});

export const resetCart = () => ({
    type: 'RESET_CART',
});