import { v4 as uuidv4 } from 'uuid';
import {
    GET_INGRID_FAILED, GET_INGRID_REQUEST, GET_INGRID_SUCCESS,
    ADD_INGRID, ADD_INGRIDS,
    POST_ORDER_NUMBER_FAILED, POST_ORDER_NUMBER_REQUEST,
    POST_ORDER_NUMBER_SUCCESS
} from "../actions/burgerState";


const initialState = {
    ingrid: [],
    selectedItems: [],
    selectedItemBuns: {},
    isLoading: false,
    hasError: false,
    orderNumber: null,
};

export const burgerReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_INGRID_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case GET_INGRID_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hasError: false,
                ingrid: action.ingrid.data
            };
        }
        case GET_INGRID_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false,
            };
        }
        case ADD_INGRID: {
            return {
                ...state,
                selectedItemBuns: action.item
            };
        }
        case ADD_INGRIDS: {
            const newItem = {
                ...action.item,
                key: uuidv4(),
            };
            return {
                ...state,
                selectedItems: [...state.selectedItems, newItem]
            };
        }
        case POST_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case POST_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false,
            };
        }
        case POST_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                hasError: false,
                orderNumber: action.orderNumber
            };
        }
        default: {
            return state;
        }
    }
}