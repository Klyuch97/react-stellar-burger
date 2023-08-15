import { v4 as uuidv4 } from 'uuid';
import { request } from "../../utils/api";

export const GET_INGRID_REQUEST = 'GET_INGRID_REQUEST';
export const GET_INGRID_SUCCESS = 'GET_INGRID_SUCCESS';
export const GET_INGRID_FAILED = 'GET_INGRID_FAILED';
export const ADD_INGRID = 'ADD_INGRID';
export const ADD_INGRIDS = 'ADD_INGRIDS';
export const POST_ORDER_NUMBER_REQUEST = 'POST_ORDER_NUMBER_REQUEST';
export const POST_ORDER_NUMBER_SUCCESS = 'POST_ORDER_NUMBER_SUCCESS';
export const POST_ORDER_NUMBER_FAILED = 'POST_ORDER_NUMBER_FAILED';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const CHANGE_CARTS = "CHANGE_CARTS";
export const CURRENT_INGRID = "CURRENT_INGRID"


export const getIngrid = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INGRID_REQUEST });

    try {
      const response = await request("ingredients");
      dispatch({ type: GET_INGRID_SUCCESS, ingrid: response });
    } catch (error) {
      dispatch({ type: GET_INGRID_FAILED });
      alert(`Ошибка: ${error}`);
    }
  };
};

export const postOrderSubmit = (ingredient) => {
  return async (dispatch) => {
    dispatch({ type: POST_ORDER_NUMBER_REQUEST })
    try {
      const response = await request("orders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: ingredient }),
      });
      const orderNumber = response.order.number;
      dispatch({ type: POST_ORDER_NUMBER_SUCCESS, orderNumber })
      console.log('Номер заказа:', orderNumber);
    }
    catch (error) {
      dispatch({ type: POST_ORDER_NUMBER_FAILED })
      alert(`Ошибка: ${error}`);
    }


  }
}

export const addItem = (item) => {
  return {
    type: ADD_INGRID,
    item,
  };
};

export const addItems = (item) => {
  const newItem = {
    ...item,
    key: uuidv4(),
  };

  return {
    type: ADD_INGRIDS,
    item: newItem,
  };
};



