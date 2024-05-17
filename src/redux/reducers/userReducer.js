const initialState = {
    isLoggedIn : false,
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;