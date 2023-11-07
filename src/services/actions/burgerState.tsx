import { v4 as uuidv4 } from 'uuid';
import { request } from "../../utils/api";
import { Ingregient } from '../../types/types';
import {
  GET_INGRID_FAILED, GET_INGRID_REQUEST, GET_INGRID_SUCCESS,
  ADD_INGRID, ADD_INGRIDS, POST_ORDER_NUMBER_FAILED, POST_ORDER_NUMBER_REQUEST,
  POST_ORDER_NUMBER_SUCCESS, DELETE_INGRIDIENT, CHANGE_CARTS
} from '../constants';
import { AppDispatch, AppThunk } from '../../types';


export type GetIngridRequest = {
  readonly type: typeof GET_INGRID_REQUEST;
}
export type GetIngridSuccess = {
  readonly type: typeof GET_INGRID_SUCCESS;
  readonly ingrid: ReadonlyArray<Ingregient>
}
export type GetIngridFailed = {
  readonly type: typeof GET_INGRID_FAILED;
}
export type PostOrderRequest = {
  readonly type: typeof POST_ORDER_NUMBER_REQUEST;
}
export type PostOrderSuccess = {
  readonly type: typeof POST_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: number
}
export type PostOrderFailed = {
  readonly type: typeof POST_ORDER_NUMBER_FAILED;
}
export type AddIngrid = {
  readonly type: typeof ADD_INGRID,
  item: Ingregient
}
export type AddIngrids = {
  readonly type: typeof ADD_INGRIDS,
  item: Ingregient
}
export type DeleteIngredient = {
  readonly type: typeof DELETE_INGRIDIENT,
  payload: Ingregient
}
export type ChangeCarts = {
  readonly type: typeof CHANGE_CARTS,
  payload: ReadonlyArray<Ingregient>
}

export const getPostOrderAction = (): PostOrderRequest => ({
  type: POST_ORDER_NUMBER_REQUEST
});
export const getPostOrderFailedAction = (): PostOrderFailed => ({
  type: POST_ORDER_NUMBER_FAILED
});
export const getPostOrderSuccessAction = (orderNumber: number): PostOrderSuccess => ({
  type: POST_ORDER_NUMBER_SUCCESS,
  orderNumber
});
export const getIngridAction = (): GetIngridRequest => ({
  type: GET_INGRID_REQUEST
});

export const getIngridFailedAction = (): GetIngridFailed => ({
  type: GET_INGRID_FAILED
});
export const getIngridSuccessAction = (ingrid: ReadonlyArray<Ingregient>): GetIngridSuccess => ({
  type: GET_INGRID_SUCCESS,
  ingrid
});



export const getIngrid: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(getIngridAction());
    try {
      const response = await request("ingredients");
      if (response.data) {
        dispatch(getIngridSuccessAction(response.data));
      }
    } catch (error) {
      dispatch(getIngridFailedAction());
      alert(`Ошибка: ${error}`);
    }
  };
};

export const postOrderSubmit: AppThunk = (ingredient: Array<string>) => {
  return async (dispatch: AppDispatch) => {
    dispatch(getPostOrderAction())
    try {
      const response = await request("orders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ ingredients: ingredient }),
      });
      if (response.order) {
        const orderNumber = response.order.number;
        dispatch(getPostOrderSuccessAction(orderNumber))
      }

    }
    catch (error) {
      dispatch(getPostOrderFailedAction())
      alert(`Ошибка: ${error}`);
    }


  }
}

export const addItem = (item: Ingregient): AddIngrid => ({
  type: ADD_INGRID,
  item,
});

export const addItems = (item: Ingregient): AddIngrids => {
  const newItem = { ...item, key: uuidv4() };

  return { type: ADD_INGRIDS, item: newItem };
}

export type TBurgerStateActions =
  | AddIngrid
  | AddIngrids
  | GetIngridFailed
  | GetIngridRequest
  | GetIngridSuccess
  | PostOrderFailed
  | PostOrderRequest
  | PostOrderSuccess
  | DeleteIngredient
  | ChangeCarts;






