import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';
import { totalPriceReducer } from './price';
import { userReducer } from './autnUser';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    price: totalPriceReducer,
    user: userReducer
});