import { IUser } from "../../types/types";
import {
    TAuthUserActions
} from "../actions/autnUser";
import {
    REGISTER_FAILED, REGISTER_SUCCESS, REGISTER_REQUEST, GET_USER_REQUEST,
    GET_USER_SUCCESS, GET_USER__FAILED, SET_AUTH_CHECKED, SET_USER,
    LOGOUT_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS,
    UPDATE_USER_INFO_FAILED, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS,
    FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED
} from "../constants/index"

export type TAuthUserState = {
    user: IUser | null,
    loading: boolean,
    error: boolean,
    isAuthChecked: boolean,
}

const initialState: TAuthUserState = {
    user: null,
    loading: false,
    error: false,
    isAuthChecked: false,
};

export const userReducer = (state = initialState, action: TAuthUserActions): TAuthUserState => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                error: false,
            };
        case REGISTER_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                error: false,
            };
        case GET_USER__FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case SET_AUTH_CHECKED:
            return {
                ...state,
                isAuthChecked: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                error: false,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case UPDATE_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.user,
                loading: false,
                error: false,
            };
        case UPDATE_USER_INFO_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                user: action.user,
            };
        case FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
            };
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                error: true
            };
        default:
            return state;
    }
};