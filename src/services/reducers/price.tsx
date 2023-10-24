import { IIngregient } from "../../types/types";
import { TPriceStateActions } from "../actions/price";
import { INCREMENT, DECREMENT, RESET} from "../constants/index"

type TPriceState = {
    selectedItems: ReadonlyArray<IIngregient> | [],
    selectedItemBuns: object,
    totalPrice: number,
    price: number,
    priceBuns: number,
}

const priceInitialState: TPriceState = {
    selectedItems: [],
    selectedItemBuns: [],
    totalPrice: 0,
    price: 0,
    priceBuns: 0,
};

export const totalPriceReducer = (state = priceInitialState, action:TPriceStateActions): TPriceState => {
    switch (action.type) {
        case INCREMENT: {
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
            }
        }
        case DECREMENT: {
            return {
                ...state,
                price: state.price - action.payload.price,
                totalPrice: state.totalPrice - action.payload.price
            }
        }
        case RESET: {
            return {
                selectedItems: [],
                selectedItemBuns: [],
                totalPrice: 0,
                price: 0,
                priceBuns: 0,
            }
        }
        default: {
            return state;
        }
    }
}