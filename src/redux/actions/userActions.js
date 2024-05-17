export const setIsLoggedIn = (isLoggedIn) => {
    return {
        type: 'SET_IS_LOGGED_IN',
        payload: isLoggedIn,
    };

};
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    };

};

