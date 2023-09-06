import {
    REGISTER_FAILURE, REGISTER_SUCCESS, REGISTER_REQUEST, GET_USER_REQUEST,
    GET_USER_SUCCESS, GET_USER__FAILED, SET_AUTH_CHECKED, SET_USER
} from "../actions/autnUser";

const initialState = {
    user: null,
    loading: false,
    error: false,
    isAuthChecked: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: false,
            };
        case REGISTER_FAILURE:
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
                user: action.payload,
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
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
};