import { combineReducers } from 'redux';
import planReducer from './planReducer';
import userReducer from "./userReducer";
import favoriteReducer from "./favoriteReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    plans: planReducer,
    user: userReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
});

export default rootReducer;