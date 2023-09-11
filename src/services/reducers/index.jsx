import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';
import { totalPriceReducer } from './price';
import { userReducer } from './autnUser';
import { wsReducer } from './web-socket';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    price: totalPriceReducer,
    user: userReducer,
    feed: wsReducer
});