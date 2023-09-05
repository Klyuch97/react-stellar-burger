import { fetchWithRefresh, request } from "../../utils/api";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER__FAILED = 'GET_USER__FAILED';

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
            if (response.success) {
                localStorage.setItem("refreshToken", response.refreshToken);
                localStorage.setItem("accessToken", response.accessToken);
                dispatch({
                    type: "REGISTER_SUCCESS",
                    payload: response.user,
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

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: GET_USER_REQUEST });
        try {
            const response = await request("auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: localStorage.getItem('accessToken')
                }
            });
            dispatch({ type: GET_USER_SUCCESS, user: response.user });
        } catch (error) {
            dispatch({ type: GET_USER__FAILED });
            alert(`Ошибка: ${error}`);
        }
    };
};

