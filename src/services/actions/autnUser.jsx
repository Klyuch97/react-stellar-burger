import { fetchWithRefresh } from "../../utils/api";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST'


export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch({ type: REGISTER_SUCCESS })
        try {
            const response = await fetchWithRefresh("https://norma.nomoreparties.space/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (data.success) {
                dispatch({
                    type: "REGISTER_SUCCESS",
                    payload: data.user,
                });
            } else {
                dispatch({
                    type: "REGISTER_FAILURE",
                });
            }
        } catch (error) {
            dispatch({
                type: "REGISTER_FAILURE",
            });
        }
    };
};