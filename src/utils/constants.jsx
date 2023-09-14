import {
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE, WS_INIT_USER_ORDER_START
} from "../services/actions/web-socket";


export const wsUrl = "wss://norma.nomoreparties.space/orders"

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsInitUserOrder: WS_INIT_USER_ORDER_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};