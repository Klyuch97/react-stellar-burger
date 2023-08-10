export const GET_INGRID_REQUEST = 'GET_INGRID_REQUEST';
export const GET_INGRID_SUCCESS = 'GET_INGRID_SUCCESS';
export const GET_INGRID_FAILED = 'GET_INGRID_FAILED';
export const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

export function getIngrid() {
    return function(dispatch) {
      dispatch({
        type: GET_INGRID_REQUEST
      })
      fetch(baseUrl).then( res  => {
        if (res && res.success) {
          dispatch({
            type: GET_INGRID_SUCCESS,
            ingrid: res.data
          })
        } else {
          dispatch({
            type: GET_INGRID_FAILED
          })
        }
      })
    }
  } 