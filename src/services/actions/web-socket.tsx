import { IOrderDetails } from "../../types/types";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_INIT_USER_ORDER_START } from "../constants";




export interface IWsConnectStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: Array<IOrderDetails>;
    success: boolean;
    total: number;
    totalToday: number;
  }
  
}
export interface IWsInitUserOrderStart {
  readonly type: typeof WS_INIT_USER_ORDER_START;
}

export const wsConnectionSuccess = (): IWsConnectSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionError = (): IWsConnectError => ({
  type: WS_CONNECTION_ERROR
});

export const wsConnectionClosed = (): IWsConnectClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message:{
  orders: Array<IOrderDetails>;
  success: boolean;
  total: number;
  totalToday: number;
}) => ({
  type: WS_GET_MESSAGE,
  payload: message
});

export type TWsActions =
  | IWsConnectClosed
  | IWsConnectError
  | IWsConnectStart
  | IWsConnectSuccess
  | IWsGetMessage
  | IWsInitUserOrderStart;