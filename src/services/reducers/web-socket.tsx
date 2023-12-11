import {TWsActions} from "../actions/web-socket";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } from "../constants";

export type TWsState = {
    wsConnected: boolean,
    messages: { [key: string]: any },
}

const initialState:TWsState = {
    wsConnected: false,
    messages: {}
};

export const wsReducer = (state = initialState, action:TWsActions):TWsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                messages: {}
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                messages: action.payload
           };

        default:
            return state;
    }
};