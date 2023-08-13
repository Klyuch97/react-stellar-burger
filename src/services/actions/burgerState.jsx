import { BASE_URL } from "../../utils/api";
import { v4 as uuidv4 } from 'uuid';

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


export const getIngrid = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INGRID_REQUEST });

    const response = await fetch(`${BASE_URL}ingredients`);
    const data = await response.json();

    if (response.ok && data.success) {
      dispatch({ type: GET_INGRID_SUCCESS, ingrid: data });
    } else {
      dispatch({ type: GET_INGRID_FAILED });
    }
  };
};

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



