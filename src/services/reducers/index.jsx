import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';

export const rootReducer = combineReducers({
    burger: burgerReducer,
});