import { v4 as uuidv4 } from 'uuid';
import { request } from "../../utils/api";
import { IIngregient } from '../../types/types';
import {
  GET_INGRID_FAILED, GET_INGRID_REQUEST, GET_INGRID_SUCCESS,
  ADD_INGRID, ADD_INGRIDS, POST_ORDER_NUMBER_FAILED, POST_ORDER_NUMBER_REQUEST,
  POST_ORDER_NUMBER_SUCCESS, DELETE_INGRIDIENT, CHANGE_CARTS
} from '../constants';
import { AppDispatch, AppThunk } from '../../types';


export interface IGetIngridRequest {
  readonly type: typeof GET_INGRID_REQUEST;
}
export interface IGetIngridSuccess {
  readonly type: typeof GET_INGRID_SUCCESS;
  readonly ingrid: ReadonlyArray<IIngregient>
}
export interface IGetIngridFailed {
  readonly type: typeof GET_INGRID_FAILED;
}
export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_NUMBER_REQUEST;
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: number
}
export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_NUMBER_FAILED;
}
export interface IAddIngrid {
  readonly type: typeof ADD_INGRID,
  item: IIngregient
}
export interface IAddIngrids {
  readonly type: typeof ADD_INGRIDS,
  item: IIngregient
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGRIDIENT,
  payload: IIngregient
}
export interface IChangeCarts {
  readonly type: typeof CHANGE_CARTS,
  payload: ReadonlyArray<IIngregient>
}

export const getPostOrderAction = (): IPostOrderRequest => ({
  type: POST_ORDER_NUMBER_REQUEST
});
export const getPostOrderFailedAction = (): IPostOrderFailed => ({
  type: POST_ORDER_NUMBER_FAILED
});
export const getPostOrderSuccessAction = (orderNumber: number): IPostOrderSuccess => ({
  type: POST_ORDER_NUMBER_SUCCESS,
  orderNumber
});
export const getIngridAction = (): IGetIngridRequest => ({
  type: GET_INGRID_REQUEST
});

export const getIngridFailedAction = (): IGetIngridFailed => ({
  type: GET_INGRID_FAILED
});
export const getIngridSuccessAction = (ingrid: ReadonlyArray<IIngregient>): IGetIngridSuccess => ({
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

export const addItem = (item: IIngregient): IAddIngrid => ({
  type: ADD_INGRID,
  item,
});

export const addItems = (item: IIngregient): IAddIngrids => {
  const newItem = { ...item, key: uuidv4() };

  return { type: ADD_INGRIDS, item: newItem };
}

export type TBurgerStateActions =
  | IAddIngrid
  | IAddIngrids
  | IGetIngridFailed
  | IGetIngridRequest
  | IGetIngridSuccess
  | IPostOrderFailed
  | IPostOrderRequest
  | IPostOrderSuccess
  | IDeleteIngredient
  | IChangeCarts;






