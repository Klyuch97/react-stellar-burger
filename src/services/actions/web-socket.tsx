import { OrderDetails } from "../../types/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_INIT_USER_ORDER_START } from "../constants";




export type WsConnectStart = {
  readonly type: typeof WS_CONNECTION_START;
}
export type WsConnectSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export type WsConnectError = {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export type WsConnectClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export type WsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: OrderDetails[];
    success: boolean;
    total: number;
    totalToday: number;
  }

}
export type WsInitUserOrderStart = {
  readonly type: typeof WS_INIT_USER_ORDER_START;
}

export const wsConnectionSuccess = (): WsConnectSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (): WsConnectError => ({
  type: WS_CONNECTION_ERROR
});

export const wsConnectionClosed = (): WsConnectClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message: {
  orders: OrderDetails[];
  success: boolean;
  total: number;
  totalToday: number;
}) => ({
  type: WS_GET_MESSAGE,
  payload: message
});

export type TWsActions =
  | WsConnectClosed
  | WsConnectError
  | WsConnectStart
  | WsConnectSuccess
  | WsGetMessage
  | WsInitUserOrderStart;