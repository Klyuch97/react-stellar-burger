import { GET_INGRID_FAILED, GET_INGRID_REQUEST, GET_INGRID_SUCCESS } from "../actions/burgerState";


const initialState = {
    ingrid: [],
    selectedItems: [],
    selectedItemBuns: [],
    currentIngredient: null,
    isLoading: false,
    hasError: false,
    totalPrice: 0,
    price: 0,
    priceBuns: 0,
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
                itemsRequest: false,
                itemsFailed: false,
                ingrid: action.items
            };
        }
        case GET_INGRID_FAILED: {
            return {
                ...state,
                hasError: true,
                isLoading: false,
            };
        }
        default: {
            return state;
        }
    }
}