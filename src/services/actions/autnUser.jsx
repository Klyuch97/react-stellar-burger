import { fetchWithRefresh, request } from "../../utils/api";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER__FAILED = 'GET_USER__FAILED';
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const registerUser = (userData) => {
    return async (dispatch) => {
        dispatch({ type: REGISTER_SUCCESS })
        try {
            const response = await fetchWithRefresh("auth/register", {
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
            const response = await fetchWithRefresh("auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: localStorage.getItem('accessToken')
                }
            });
            dispatch({ type: GET_USER_SUCCESS, user: response.user });
            dispatch(setUser(response.user));
        } catch (error) {
            dispatch({ type: GET_USER__FAILED });
           // alert(`Ошибка: ${error}`);
        }
    };
};

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
                .catch(() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    dispatch(setUser(null));
                })
                .finally(() => dispatch(setAuthChecked(true)));
        } else {
            dispatch(setAuthChecked(true));
        }
    };
};
