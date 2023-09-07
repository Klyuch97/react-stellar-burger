import { fetchWithRefresh, request } from "../../utils/api";

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER__FAILED = 'GET_USER__FAILED';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SET_USER = 'SET_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';


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
        dispatch({ type: "REGISTER_SUCCESS" })
        try {
            const response = await request("auth/register", {
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

export const logOut = () => {
    return async (dispatch) => {
        // dispatch({ type: LOGOUT_SUCCESS })
        try {
            const response = await request("auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: localStorage.refreshToken }),
            });
            if (response.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch({
                    type: "LOGOUT_SUCCESS",
                    //payload: response.user,
                });
            } else {
                dispatch({
                    //type: "LOGOUT_FAILURE",
                });
            }
        } catch (error) {
            dispatch({
                //type: "LOGOUT_FAILURE",
            });
        }
    };
};

export const LogIn = (userData) => {
    return async (dispatch) => {
        dispatch({ type: "LOGIN_REQUEST" });
        try {
            const response = await fetchWithRefresh("auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(userData),
            });
            if (response.success) {
                localStorage.setItem("refreshToken", response.refreshToken);
                localStorage.setItem("accessToken", response.accessToken);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.user,
                });
            } else {
                dispatch({
                    type: "LOGIN_FAILURE",
                });
            }
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILURE",
            });
        }
    };
};

export const updateUserInfo = (userData) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_USER_INFO_REQUEST" })
        try {
            const response = await fetchWithRefresh("auth/user", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: localStorage.getItem('accessToken')
                },
                body: JSON.stringify(userData),
            });
            if (response.success) {
                dispatch({
                    type: "UPDATE_USER_INFO_SUCCESS",
                    payload: response.user,
                });
                dispatch(setUser(response.user));
            } else {
                dispatch({
                    type: "UPDATE_USER_INFO_FAILURE",
                });
            }
        } catch (error) {
            dispatch({
                type: "UPDATE_USER_INFO_FAILURE",
            });
        }
    };
};

export const forgotPassword = (userData, pageResetPassword) => {
    return async (dispatch) => {
        dispatch({ type: "FORGOT_PASSWORD_REQUEST" })
        try {
            const response = await request("password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.success) {
                dispatch({
                    type: "FORGOT_PASSWORD_SUCCESS",
                    payload: response.user,
                });
                dispatch(setUser(response.user));
                pageResetPassword()
            } else {
                dispatch({
                    type: "FORGOT_PASSWORD_FAILED",
                });
            }
        } catch (error) {
            dispatch({
                type: "FORGOT_PASSWORD_FAILED",
            });
        }
    };
};

export const resetPassword = (newPassword,code) => {
    return async (dispatch) => {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });
        try {
            const response = await request("password-reset/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword, token: code })
            });
            if (response.success) {
                dispatch({
                    type: "RESET_PASSWORD_SUCCESS",
                })
            }
            else {
                dispatch({
                    type: "RESET_PASSWORD_FAILED",
                });
            }
        }
        catch (err) {
            dispatch({
                type: "RESET_PASSWORD_FAILED",
            });
        }

    }
}
