import { INCREMENT,DECREMENT } from "../actions/price";

const priceInitialState = {
    selectedItems: [],
    selectedItemBuns: [],
    totalPrice: 0,
    price: 0,
    priceBuns: 0,
};

export const totalPriceReducer = (state = priceInitialState, action) => {
    switch (action.type) {
        case INCREMENT:{
            if (action.payload.type === "bun") {
                return {
                    ...state,
                    selectedItemBuns: [action.payload],
                    priceBuns: action.payload.price * 2,
                    totalPrice: state.price + action.payload.price * 2
                };
            } else {
                return {
                    ...state,
                    selectedItems: [...state.selectedItems, action.payload],
                    price: state.price + action.payload.price,
                    totalPrice: state.price + state.priceBuns + action.payload.price,
                };
            }}
        case DECREMENT: {
            return {
                ...state,
                price: state.price - action.payload.price,
                totalPrice: state.totalPrice - action.payload.price
            }
        }
        default: {
            return state;
        }
    }
}