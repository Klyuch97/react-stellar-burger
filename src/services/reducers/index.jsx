import { combineReducers } from 'redux';
import { burgerReducer } from './burgerState';
import { modalReducer } from './modal';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    modal: modalReducer,
});