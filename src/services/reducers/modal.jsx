import { MODAL_CLOSE, MODAL_OPEN } from "../actions/modal";

const initialStateModal = {
    modalActive: false,
    currentIngrid: null
};

export const modalReducer = (state = initialStateModal, action) => {
    switch (action.type) {
        case MODAL_OPEN: {
            return {
                ...state,
                modalActive: true,
                currentIngrid: action.payload
            };
        }
        case MODAL_CLOSE: {
            return {
                ...state,
                modalActive: false,
            };
        }
        default:
            return state;
    }
}