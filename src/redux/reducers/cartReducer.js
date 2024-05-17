import cartStorage from "../../storage/cartStorage";

const initialState = {
    cartList: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingAddIndex = state.cartList.findIndex(item => item.plan.id === action.payload.plan.id);
            let updatedCartList;

            if (existingAddIndex >= 0) {
                updatedCartList = state.cartList.map((item, index) =>
                    index === existingAddIndex ? { ...item, count: item.count + 1 } : item
                );
            } else {
                updatedCartList = [...state.cartList, { plan: action.payload.plan, count: 1 }];
            }


            console.log(updatedCartList)
            cartStorage.saveCart(updatedCartList).then();
            return {
                ...state,
                cartList: updatedCartList
            };

        case 'REMOVE_FROM_CART':
            const existingRemoveIndex = state.cartList.findIndex(item => item.plan.id === action.payload.plan.id);
            let newCartList;

            if (existingRemoveIndex >= 0) {
                const item = state.cartList[existingRemoveIndex];
                if (item.count > 1) {
                    newCartList = state.cartList.map((item, index) =>
                        index === existingRemoveIndex ? { ...item, count: item.count - 1 } : item
                    );
                } else {
                    newCartList = state.cartList.filter((_, index) => index !== existingRemoveIndex);
                }
            } else {
                newCartList = state.cartList;
            }

            cartStorage.saveCart(newCartList).then();

            return {
                ...state,
                cartList: newCartList
            };

        case 'SET_CART_FROM_LOCAL':
            return {
                ...state,
                cartList: action.payload,
            };

        case 'RESET_CART':
            cartStorage.saveCart([]).then();
            return {
                ...state,
                cartList: [],
            };

        default:
            return state;
    }
};

export default cartReducer;
