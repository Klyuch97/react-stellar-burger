export const GET_INGRID_REQUEST = 'GET_INGRID_REQUEST';
export const GET_INGRID_SUCCESS = 'GET_INGRID_SUCCESS';
export const GET_INGRID_FAILED = 'GET_INGRID_FAILED';
export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngrid = () => {
  return async (dispatch) => {
  dispatch({ type: GET_INGRID_REQUEST });
  
  const response = await fetch(baseUrl);
  const data = await response.json();
  
  if (response.ok && data.success) {
  dispatch({ type: GET_INGRID_SUCCESS, ingrid: data });
  } else {
  dispatch({ type: GET_INGRID_FAILED });
  }
  };
  };