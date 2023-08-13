import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';
import { modalReducer } from './modal';
import { totalPriceReducer } from './price';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    modal: modalReducer,
    price: totalPriceReducer,
});