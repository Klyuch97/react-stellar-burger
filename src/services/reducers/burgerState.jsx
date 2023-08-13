
import {
    GET_INGRID_FAILED, GET_INGRID_REQUEST, GET_INGRID_SUCCESS,
    ADD_INGRID, ADD_INGRIDS,
    POST_ORDER_NUMBER_FAILED, POST_ORDER_NUMBER_REQUEST,
    POST_ORDER_NUMBER_SUCCESS, DELETE_INGRIDIENT, CHANGE_CARTS
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
            return {
                ...state,
                selectedItems: [...state.selectedItems, action.item]
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
        case DELETE_INGRIDIENT: {
            return {
                ...state,
                selectedItems: state.selectedItems.filter((item) => item.key !== action.payload.key)
            }
        }
        case CHANGE_CARTS: {
            return {
                ...state,
                selectedItems: [...action.payload]
            }
        }
        default: {
            return state;
        }
    }
}