import { AppDispatch, AppThunk } from "../../types";
import { IUser } from "../../types/types";
import { fetchWithRefresh, request } from "../../utils/api";
import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER__FAILED, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILED, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, SET_AUTH_CHECKED, SET_USER, UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS } from "../constants";



export interface ISetAuthCheked {
    readonly type: typeof SET_AUTH_CHECKED;
    payload: boolean;
}
export interface ISetUser {
    readonly type: typeof SET_USER;
    payload: IUser | null;
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}
export const logOutSuccessAction = (): ILogoutSuccess => ({
    type: LOGOUT_SUCCESS
});

export interface IRegisterSuccess {
    readonly type: typeof REGISTER_SUCCESS;
    readonly user: IUser
}
export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED;
}
export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}

export const registerRequestAction = (): IRegisterRequest => ({
    type: REGISTER_REQUEST
});
export const registerFailedAction = (): IRegisterFailed => ({
    type: REGISTER_FAILED
});
export const registerSuccessAction = (user: IUser): IRegisterSuccess => ({
    type: REGISTER_SUCCESS,
    user
});




export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserFailed {
    readonly type: typeof GET_USER__FAILED;
}
export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: any
}

export const getUserRequestAction = (): IGetUserRequest => ({
    type: GET_USER_REQUEST
});
export const getUserFailedAction = (): IGetUserFailed => ({
    type: GET_USER__FAILED
});
export const getUserSuccessAction = (user: IUser): IGetUserSuccess => ({
    type: GET_USER_SUCCESS,
    user
});



export const setAuthChecked = (value: boolean): ISetAuthCheked => ({
    type: SET_AUTH_CHECKED,
    payload: value,
});

export const setUser = (user: IUser | null): ISetUser => ({
    type: SET_USER,
    payload: user,
});

export const registerUser = (userData: IUser) => {
    return async (dispatch: any) => {
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
                localStorage.setItem("refreshToken", response.refreshToken);
                localStorage.setItem("accessToken", response.accessToken);
                // dispatch({
                //     type: "REGISTER_SUCCESS",
                //     payload: response.user,
                // });
                dispatch(registerSuccessAction(response.user));
            } else {
                dispatch(registerFailedAction());
            }
        } catch (error) {
            dispatch(registerFailedAction());
        }
    };
};

export const getUser: any = () => {
    return async (dispatch: any) => {
        dispatch(getUserRequestAction());
        try {
            const response = await fetchWithRefresh("auth/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    authorization: localStorage.getItem('accessToken')
                }
            });
            //dispatch({ type: GET_USER_SUCCESS, user: response.user });
            dispatch(getUserSuccessAction(response.user));
            dispatch(setUser(response.user));
        } catch (error) {
            dispatch(getUserFailedAction());
            alert(`Ошибка: ${error}`);
        }
    };
};

export const checkUserAuth: AppThunk = () => {
    return (dispatch: AppDispatch) => {
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

export const logOut: any = () => {
    return async (dispatch: any) => {
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

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST;
}
export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}
export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
    readonly user: IUser
}

export const loginRequestAction = (): IGetUserRequest => ({
    type: GET_USER_REQUEST
});
export const loginFailedAction = (): IGetUserFailed => ({
    type: GET_USER__FAILED
});
export const loginSuccessAction = (user: IUser): IGetUserSuccess => ({
    type: GET_USER_SUCCESS,
    user
});

export const LogIn = (userData: IUser) => {
    return async (dispatch: any) => {
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
                // dispatch({
                //     type: "LOGIN_SUCCESS",
                //     payload: response.user,
                // });
                dispatch(loginSuccessAction(response.user));
            } else {
                dispatch(loginFailedAction());
            }
        } catch (error) {
            dispatch(loginFailedAction());
        }
    };
};

export interface IUpdateUserInfoRequest {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserInfoFailed {
    readonly type: typeof UPDATE_USER_INFO_FAILED;
}
export interface IUpdateUserInfoSuccess {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    readonly user: IUser
}

export const updateUserInfoRequestAction = (): IUpdateUserInfoRequest => ({
    type: UPDATE_USER_INFO_REQUEST
});
export const updateUserInfoFailedAction = (): IUpdateUserInfoFailed => ({
    type: UPDATE_USER_INFO_FAILED
});
export const updateUserInfoSuccessAction = (user: IUser): IUpdateUserInfoSuccess => ({
    type: UPDATE_USER_INFO_SUCCESS,
    user
});


export const updateUserInfo = (userData: IUser) => {
    return async (dispatch: any) => {
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
                // dispatch({
                //     type: "UPDATE_USER_INFO_SUCCESS",
                //     payload: response.user,
                // });
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


export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}
export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
    readonly user: IUser
}

export const forgotPasswordRequestAction = (): IForgotPasswordRequest => ({
    type: FORGOT_PASSWORD_REQUEST
});
export const forgotPasswordFailedAction = (): IForgotPasswordFailed => ({
    type: FORGOT_PASSWORD_FAILED
});
export const forgotPasswordSuccessAction = (user: IUser): IForgotPasswordSuccess => ({
    type: FORGOT_PASSWORD_SUCCESS,
    user
});


export const forgotPassword = (userData: IUser, pageResetPassword: () => void) => {
    return async (dispatch: any) => {
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
                // dispatch({
                //     type: "FORGOT_PASSWORD_SUCCESS",
                //     payload: response.user,
                // });
                dispatch(forgotPasswordSuccessAction(response.user));
                dispatch(setUser(response.user));
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

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}


export const resetPasswordRequestAction = (): IResetPasswordRequest => ({
    type: RESET_PASSWORD_REQUEST
});
export const resetPasswordFailedAction = (): IResetPasswordFailed => ({
    type: RESET_PASSWORD_FAILED
});
export const resetPasswordSuccessAction = (): IResetPasswordSuccess => ({
    type: RESET_PASSWORD_SUCCESS
});

export const resetPassword = (newPassword: number, code: string, pageLogin: () => void) => {
    return async (dispatch: any) => {
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
                // dispatch({
                //     type: "RESET_PASSWORD_SUCCESS",
                // });
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
    | ISetAuthCheked
    | ISetUser
    | ILogoutSuccess
    | IRegisterSuccess
    | IRegisterFailed
    | IRegisterRequest
    | IGetUserRequest
    | IGetUserFailed
    | IGetUserSuccess
    | ILoginRequest
    | ILoginFailed
    | ILoginSuccess
    | IUpdateUserInfoRequest
    | IUpdateUserInfoFailed
    | IUpdateUserInfoSuccess
    | IForgotPasswordRequest
    | IForgotPasswordFailed
    | IForgotPasswordSuccess
    | IResetPasswordRequest
    | IResetPasswordFailed
    | IResetPasswordSuccess;