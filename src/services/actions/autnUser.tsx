import { ThunkDispatch } from "redux-thunk";
import { AppDispatch, AppThunk, RootState, TApplicationActions } from "../../types";
import { User } from "../../types/types";
import { fetchWithRefresh, request } from "../../utils/api";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER__FAILED, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SET_AUTH_CHECKED, SET_USER, UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "../constants";
import { Action } from "redux";



export type SetAuthCheked = {
    readonly type: typeof SET_AUTH_CHECKED;
    payload: boolean;
}
export type SetUser = {
    readonly type: typeof SET_USER;
    payload: User | null;
}

export type LogoutSuccess = {
    readonly type: typeof LOGOUT_SUCCESS;
}
export const logOutSuccessAction = (): LogoutSuccess => ({
    type: LOGOUT_SUCCESS
});

export type RegisterSuccess = {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: User
}
export type RegisterFailed = {
    readonly type: typeof REGISTER_FAILED;
}
export type RegisterRequest = {
    readonly type: typeof REGISTER_REQUEST;
}

export const registerRequestAction = (): RegisterRequest => ({
    type: REGISTER_REQUEST
});
export const registerFailedAction = (): RegisterFailed => ({
    type: REGISTER_FAILED
});
export const registerSuccessAction = (user: User): RegisterSuccess => ({
    type: REGISTER_SUCCESS,
    user
});


export type GetUserRequest = {
    readonly type: typeof GET_USER_REQUEST;
}
export type GetUserFailed = {
    readonly type: typeof GET_USER__FAILED;
}
export type GetUserSuccess = {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: User
}

export const getUserRequestAction = (): GetUserRequest => ({
    type: GET_USER_REQUEST
});
export const getUserFailedAction = (): GetUserFailed => ({
    type: GET_USER__FAILED
});
export const getUserSuccessAction = (user: User): GetUserSuccess => ({
    type: GET_USER_SUCCESS,
    user
});



export const setAuthChecked = (value: boolean): SetAuthCheked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user: User | null): SetUser => ({
    type: SET_USER,
    payload: user,
});

export const registerUser = (userData: User) => {
    return async (dispatch: AppDispatch) => {
        dispatch(registerRequestAction())
        try {
            const response = await request("auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.success) {
                if (response.refreshToken) {
                    localStorage.setItem("refreshToken", response.refreshToken);
                }
                if (response.accessToken) {
                    localStorage.setItem("accessToken", response.accessToken);
                }
                if (response.user) {
                    dispatch(registerSuccessAction(response.user));
                }

            } else {
                dispatch(registerFailedAction());
            }
        } catch (error) {
            dispatch(registerFailedAction());
        }
    };
};

export const getUser: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(getUserRequestAction());
        try {
            const response = await fetchWithRefresh("auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: localStorage.getItem('accessToken')
                }
            });
            dispatch(getUserSuccessAction(response.user));
            dispatch(setUser(response.user));
        } catch (error) {
            dispatch(getUserFailedAction());
            alert(`Ошибка: ${error}`);
        }
    };
};

export const checkUserAuth: AppThunk = () => {
    return (dispatch: ThunkDispatch<Action<any>, RootState, TApplicationActions>) => {
        if (localStorage.getItem("accessToken")) {
            Promise.resolve(dispatch(getUser()))
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

export const logOut: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginRequestAction());
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
                dispatch(logOutSuccessAction());
            } else {
                dispatch(loginFailedAction());
            }
        } catch (error) {
            dispatch(loginFailedAction());
        }
    };
};

export type LoginRequest = {
    readonly type: typeof LOGIN_REQUEST;
}
export type LoginFailed = {
    readonly type: typeof LOGIN_FAILED;
}
export type LoginSuccess = {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: User
}

export const loginRequestAction = (): GetUserRequest => ({
    type: GET_USER_REQUEST
});
export const loginFailedAction = (): GetUserFailed => ({
    type: GET_USER__FAILED
});
export const loginSuccessAction = (user: User): GetUserSuccess => ({
    type: GET_USER_SUCCESS,
    user
});

export const LogIn = (userData: User) => {
    return async (dispatch: AppDispatch) => {
        dispatch(loginRequestAction());
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
                dispatch(loginSuccessAction(response.user));
            } else {
                dispatch(loginFailedAction());
            }
        } catch (error) {
            dispatch(loginFailedAction());
        }
    };
};

export type UpdateUserInfoRequest = {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export type UpdateUserInfoFailed = {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}
export type UpdateUserInfoSuccess = {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    readonly user: User
}

export const updateUserInfoRequestAction = (): UpdateUserInfoRequest => ({
    type: UPDATE_USER_INFO_REQUEST
});
export const updateUserInfoFailedAction = (): UpdateUserInfoFailed => ({
    type: UPDATE_USER_INFO_FAILED
});
export const updateUserInfoSuccessAction = (user: User): UpdateUserInfoSuccess => ({
    type: UPDATE_USER_INFO_SUCCESS,
    user
});


export const updateUserInfo = (userData: User) => {
    return async (dispatch: AppDispatch) => {
        dispatch(updateUserInfoRequestAction())
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
                dispatch(updateUserInfoSuccessAction(response.user));
                dispatch(setUser(response.user));
            } else {
                dispatch(updateUserInfoFailedAction());
            }
        } catch (error) {
            dispatch(updateUserInfoFailedAction());
        }
    };
};


export type ForgotPasswordRequest = {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export type ForgotPasswordFailed = {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export type ForgotPasswordSuccess = {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly user: User
}

export const forgotPasswordRequestAction = (): ForgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST
});
export const forgotPasswordFailedAction = (): ForgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED
});
export const forgotPasswordSuccessAction = (user: User): ForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
    user
});


export const forgotPassword = (userData: User, pageResetPassword: () => void) => {
    return async (dispatch: AppDispatch) => {
        dispatch(forgotPasswordRequestAction())
        try {
            const response = await request("password-reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if (response.success) {
                if (response.user) {
                    dispatch(forgotPasswordSuccessAction(response.user));
                    dispatch(setUser(response.user));
                }

                localStorage.setItem('resetPasswordFlag', 'true');
                pageResetPassword();

            } else {
                dispatch(forgotPasswordFailedAction());
            }
        } catch (error) {
            dispatch(forgotPasswordFailedAction());
        }
    };
};

export type ResetPasswordRequest = {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export type ResetPasswordFailed = {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
export type ResetPasswordSuccess = {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}


export const resetPasswordRequestAction = (): ResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST
});
export const resetPasswordFailedAction = (): ResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED
});
export const resetPasswordSuccessAction = (): ResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetPassword = (newPassword: string, code: string, pageLogin: () => void) => {
    return async (dispatch: AppDispatch) => {
        dispatch(resetPasswordRequestAction());
        try {
            const response = await request("password-reset/reset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: newPassword, token: code })
            });
            if (response.success) {
                dispatch(resetPasswordSuccessAction());
                pageLogin();
                localStorage.removeItem('resetPasswordFlag');
            }
            else {
                dispatch(resetPasswordFailedAction());
            }
        }
        catch (err) {
            dispatch(resetPasswordFailedAction());
        }
    }
}


export type TAuthUserActions =
    | SetAuthCheked
    | SetUser
    | LogoutSuccess
    | RegisterSuccess
    | RegisterFailed
    | RegisterRequest
    | GetUserRequest
    | GetUserFailed
    | GetUserSuccess
    | LoginRequest
    | LoginFailed
    | LoginSuccess
    | UpdateUserInfoRequest
    | UpdateUserInfoFailed
    | UpdateUserInfoSuccess
    | ForgotPasswordRequest
    | ForgotPasswordFailed
    | ForgotPasswordSuccess
    | ResetPasswordRequest
    | ResetPasswordFailed
    | ResetPasswordSuccess;