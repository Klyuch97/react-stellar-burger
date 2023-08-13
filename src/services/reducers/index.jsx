import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';
import { totalPriceReducer } from './price';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    price: totalPriceReducer,
});